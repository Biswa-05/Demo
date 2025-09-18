import React, { useRef, useState, useEffect } from "react";

const TOOL_OPTIONS = [
  { key: "pencil", label: "✏️ Pencil" },
  { key: "line", label: "📏 Line" },
  { key: "rect", label: "⬛ Rectangle" },
  { key: "square", label: "⬜ Square" },
  { key: "circle", label: "⚪ Circle" },
  { key: "oval", label: "◯ Oval" },
  { key: "curve", label: "〰️ Curve" },
  { key: "dot", label: "• Dot" },
  { key: "move", label: "🔀 Move" },

  { key: "delete", label: "🗑️ Delete shape" },
  { key: "eraser", label: "� Eraser" },
];

export default function PaintCanvas() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [brushColor, setBrushColor] = useState("#000000");
  const [fillColor, setFillColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(8);

  const [shapes, setShapes] = useState([]); // stored shapes
  const [currentShape, setCurrentShape] = useState(null); // preview while dragging
  // Undo stack for shapes
  const [undoStack, setUndoStack] = useState([]);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [moveData, setMoveData] = useState({ idx: null, offsetX: 0, offsetY: 0 });
  const [isErasing, setIsErasing] = useState(false);
  // For curve dragging
  const [curveDrag, setCurveDrag] = useState({ idx: null, point: null });
  // For curve edit mode (after drawing a curve, allow dragging its points)
  const [curveEdit, setCurveEdit] = useState({ idx: null });

  // Utility: get mouse position scaled to canvas coordinate space
  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // Distance from point to a line segment
  const pointToLineDistance = (px, py, x1, y1, x2, y2) => {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0) param = dot / len_sq;
    let xx, yy;
    if (param < 0) { xx = x1; yy = y1; }
    else if (param > 1) { xx = x2; yy = y2; }
    else { xx = x1 + param * C; yy = y1 + param * D; }
    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Hit-test whether a point is inside/near a shape (top-most check should be done by searching from end)
  const isPointInShape = (pt, shape) => {
    if (shape.type === "eraser") {
      // Draw eraser path
      ctx.save();
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = shape.size || 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      if (shape.points && shape.points.length > 0) {
        ctx.moveTo(shape.points[0].x, shape.points[0].y);
        for (let i = 1; i < shape.points.length; i++) {
          ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }
      }
      ctx.stroke();
      ctx.restore();
      return;
    }
    if (shape.type === "curve") {
      // Check if point is near any of the 3 control points
      const d1 = Math.hypot(pt.x - shape.x1, pt.y - shape.y1);
      const d2 = Math.hypot(pt.x - shape.x2, pt.y - shape.y2);
      const d3 = Math.hypot(pt.x - shape.cx, pt.y - shape.cy);
      if (d1 < 12) return { point: "start" };
      if (d2 < 12) return { point: "end" };
      if (d3 < 12) return { point: "control" };
      // Or near the curve (approximate by sampling)
      for (let t = 0; t <= 1; t += 0.05) {
        const x = (1 - t) * (1 - t) * shape.x1 + 2 * (1 - t) * t * shape.cx + t * t * shape.x2;
        const y = (1 - t) * (1 - t) * shape.y1 + 2 * (1 - t) * t * shape.cy + t * t * shape.y2;
        if (Math.hypot(pt.x - x, pt.y - y) < 8) return true;
      }
      return false;
    }
    const { x, y } = pt;
    switch (shape.type) {
      case "rect":
      case "square":
        return x >= Math.min(shape.x, shape.x + shape.w) &&
               x <= Math.max(shape.x, shape.x + shape.w) &&
               y >= Math.min(shape.y, shape.y + shape.h) &&
               y <= Math.max(shape.y, shape.y + shape.h);
      case "circle":
      case "dot": {
        const r = shape.r != null ? shape.r : shape.size;
        return Math.hypot(x - shape.x, y - shape.y) <= r + 3;
      }
      case "oval": {
        // ellipse check (rx, ry could be negative depending on drag) - normalize
        const rx = Math.abs(shape.rx || 1);
        const ry = Math.abs(shape.ry || 1);
        const dx = x - shape.x;
        const dy = y - shape.y;
        return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1.0;
      }
      case "line":
        return pointToLineDistance(x, y, shape.x1, shape.y1, shape.x2, shape.y2) <= (shape.size || 4) + 3;
      case "stroke": {
        // check proximity to any segment
        const pts = shape.points || [];
        for (let i = 0; i < pts.length - 1; i++) {
          if (pointToLineDistance(x, y, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y) <= (shape.size || 4) + 3)
            return true;
        }
        return false;
      }
      default:
        return false;
    }
  };

  // Canvas drawing functions
  const drawShape = (ctx, shape, highlight = false) => {
    if (shape.type === "eraser") {
      // Do not draw eraser as a shape
      return;
    }
    if (shape.type === "curve") {
      ctx.save();
      ctx.lineWidth = shape.size || 2;
      ctx.strokeStyle = shape.stroke || shape.color || "#000";
      ctx.beginPath();
      ctx.moveTo(shape.x1, shape.y1);
      ctx.quadraticCurveTo(shape.cx, shape.cy, shape.x2, shape.y2);
      ctx.stroke();
      if (highlight) {
        ctx.save();
        ctx.fillStyle = "#f59e0b";
        ctx.strokeStyle = "#f59e0b";
        ctx.beginPath(); ctx.arc(shape.x1, shape.y1, 6, 0, 2 * Math.PI); ctx.fill();
        ctx.beginPath(); ctx.arc(shape.x2, shape.y2, 6, 0, 2 * Math.PI); ctx.fill();
        ctx.beginPath(); ctx.arc(shape.cx, shape.cy, 6, 0, 2 * Math.PI); ctx.fill();
        ctx.restore();
      }
      ctx.restore();
      return;
    }
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = shape.size || 2;
    ctx.strokeStyle = shape.stroke || shape.color || "#000";
    ctx.fillStyle = shape.fill || shape.stroke || shape.color || "#000";

    switch (shape.type) {
      case "stroke": {
        const pts = shape.points || [];
        if (pts.length > 0) {
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
          ctx.stroke();
        }
        break;
      }
      case "dot": {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, Math.max(1, shape.r || shape.size || 2), 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
      }
      case "rect":
      case "square": {
        ctx.beginPath();
        ctx.rect(shape.x, shape.y, shape.w, shape.h);
        if (shape.fill) ctx.fill();
        ctx.stroke();
        break;
      }
      case "circle": {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, Math.max(0, shape.r || 0), 0, Math.PI * 2);
        if (shape.fill) ctx.fill();
        ctx.stroke();
        break;
      }
      case "oval": {
        ctx.beginPath();
        ctx.ellipse(shape.x, shape.y, Math.abs(shape.rx || 1), Math.abs(shape.ry || 1), 0, 0, Math.PI * 2);
        if (shape.fill) ctx.fill();
        ctx.stroke();
        break;
      }
      case "line": {
        ctx.beginPath();
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.stroke();
        break;
      }
      default:
        break;
    }

    if (highlight) {
      // draw bounding box
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#f59e0b"; // amber
      const bbox = getShapeBBox(shape);
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(bbox.x, bbox.y, bbox.w, bbox.h);
      ctx.setLineDash([]);
    }

    ctx.restore();
  };

  const getShapeBBox = (shape) => {
    switch (shape.type) {
      case "rect":
      case "square":
        return { x: Math.min(shape.x, shape.x + shape.w), y: Math.min(shape.y, shape.y + shape.h), w: Math.abs(shape.w), h: Math.abs(shape.h) };
      case "circle":
      case "dot":
        return { x: shape.x - shape.r, y: shape.y - shape.r, w: shape.r * 2, h: shape.r * 2 };
      case "oval":
        return { x: shape.x - Math.abs(shape.rx), y: shape.y - Math.abs(shape.ry), w: Math.abs(shape.rx) * 2, h: Math.abs(shape.ry) * 2 };
      case "line":
        return { x: Math.min(shape.x1, shape.x2), y: Math.min(shape.y1, shape.y2), w: Math.abs(shape.x2 - shape.x1), h: Math.abs(shape.y2 - shape.y1) };
      case "stroke": {
        const pts = shape.points || [];
        const xs = pts.map((p) => p.x);
        const ys = pts.map((p) => p.y);
        const minX = Math.min(...xs, 0);
        const maxX = Math.max(...xs, 0);
        const minY = Math.min(...ys, 0);
        const maxY = Math.max(...ys, 0);
        return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
      }
      default:
        return { x: 0, y: 0, w: 0, h: 0 };
    }
  };

  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw all saved shapes
    for (let i = 0; i < shapes.length; i++) {
      const s = shapes[i];
      const highlight = moveData.idx === i;
      drawShape(ctx, s, highlight);
    }

    // if there is a preview shape (currentShape), draw it on top
    if (currentShape && currentShape.type === "eraser") {
      // Draw eraser path as a preview (red stroke)
      ctx.save();
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = currentShape.size || 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      if (currentShape.points && currentShape.points.length > 0) {
        ctx.moveTo(currentShape.points[0].x, currentShape.points[0].y);
        for (let i = 1; i < currentShape.points.length; i++) {
          ctx.lineTo(currentShape.points[i].x, currentShape.points[i].y);
        }
      }
      ctx.stroke();
      ctx.restore();
    } else if (currentShape) {
      drawShape(ctx, currentShape, false);
    }
  };

  // Add a new shape to the list, push previous state to undo stack
  const addShape = (shape) => {
    setUndoStack((prev) => [...prev, shapes]);
    setShapes((prev) => [...prev, shape]);
  };

  // Undo function
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const prevShapes = undoStack[undoStack.length - 1];
      setUndoStack((prev) => prev.slice(0, prev.length - 1));
      setShapes(prevShapes);
      setCurrentShape(null);
      setMoveData({ idx: null, offsetX: 0, offsetY: 0 });
    }
  };

  // Save image function with white background
  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Create a temp canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext('2d');
    // Fill white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    // Draw the original canvas on top
    ctx.drawImage(canvas, 0, 0);
    // Save
    const link = document.createElement('a');
    link.download = 'kolam-canvas.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  // Remove top-most shape that contains point
  const eraseAt = (pt) => {
    // find last shape index that contains point
    for (let i = shapes.length - 1; i >= 0; i--) {
      if (isPointInShape(pt, shapes[i])) {
        setShapes((prev) => prev.filter((_, idx) => idx !== i));
        return true;
      }
    }
    return false;
  };

  // Start pointer
  const handlePointerDown = (e) => {
    const pos = getMousePos(e);
    setIsPointerDown(true);
    setIsErasing(false);

    if (tool === "curve") {
      // If in curve edit mode, check if user is dragging a control point
      if (curveEdit.idx != null) {
        const curve = shapes[curveEdit.idx];
        if (curve) {
          const hit = isPointInShape(pos, curve);
          if (hit && typeof hit === 'object' && hit.point) {
            setCurveDrag({ idx: curveEdit.idx, point: hit.point });
            return;
          }
        }
      }
      // Start a new curve
      setCurrentShape({
        type: "curve",
        x1: pos.x,
        y1: pos.y,
        x2: pos.x,
        y2: pos.y,
        cx: pos.x,
        cy: pos.y,
        stroke: brushColor,
        size: brushSize
      });
      setCurveEdit({ idx: null });
      return;
    }
    // Move tool: move curve control points or whole curve
    if (tool === "move" || (tool === "curve" && curveEdit.idx != null)) {
      for (let i = shapes.length - 1; i >= 0; i--) {
        if (shapes[i].type === "curve") {
          const hit = isPointInShape(pos, shapes[i]);
          if (hit && typeof hit === 'object' && hit.point) {
            setCurveDrag({ idx: i, point: hit.point });
            return;
          }
          // If not on a control point but on the curve, move the whole curve
          if (hit === true) {
            setCurveDrag({ idx: i, point: "all", offsetX: pos.x, offsetY: pos.y });
            return;
          }
        }
      }
    }
    if (tool === "pencil") {
      const shape = { type: "stroke", points: [{ x: pos.x, y: pos.y }], stroke: brushColor, size: brushSize };
      setCurrentShape(shape);
    } else if (tool === "dot") {
      addShape({ type: "dot", x: pos.x, y: pos.y, r: brushSize, stroke: brushColor, fill: brushColor, size: brushSize });
    } else if (tool === "line") {
      setCurrentShape({ type: "line", x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y, stroke: brushColor, size: brushSize });
    } else if (tool === "rect" || tool === "square") {
      setCurrentShape({ type: tool === "square" ? "square" : "rect", x: pos.x, y: pos.y, w: 0, h: 0, stroke: brushColor, fill: fillColor, size: brushSize });
    } else if (tool === "circle") {
      setCurrentShape({ type: "circle", x: pos.x, y: pos.y, r: 0, stroke: brushColor, fill: fillColor, size: brushSize });
    } else if (tool === "oval") {
      setCurrentShape({ type: "oval", x: pos.x, y: pos.y, rx: 0, ry: 0, stroke: brushColor, fill: fillColor, size: brushSize });
    } else if (tool === "move") {
      // find top-most shape
      for (let i = shapes.length - 1; i >= 0; i--) {
        if (isPointInShape(pos, shapes[i])) {
          const shape = shapes[i];
          // compute offset depending on shape type
          let anchorX = shape.x ?? (shape.x1 ?? (shape.points?.[0]?.x ?? 0));
          let anchorY = shape.y ?? (shape.y1 ?? (shape.points?.[0]?.y ?? 0));
          setMoveData({ idx: i, offsetX: pos.x - anchorX, offsetY: pos.y - anchorY });
          return;
        }
      }
      // nothing selected
      setMoveData({ idx: null, offsetX: 0, offsetY: 0 });
    } else if (tool === "delete") {
      // delete shape on click
      eraseAt(pos);
      return;
    } else if (tool === "eraser") {
      // Start erasing as a white pencil (simple eraser)
      setCurrentShape({ type: "stroke", points: [{ x: pos.x, y: pos.y }], stroke: "#fff", size: brushSize });
      setIsErasing(true);
      return;
    }

    // immediate redraw to show preview or keep existing
    redraw();
  };

  // Pointer move
  const handlePointerMove = (e) => {
    const pos = getMousePos(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!isPointerDown) {
      // if not pointer down, we can change cursor or show hover effects if needed
      return;
    }

    // Curve drawing
    if (tool === "curve" && isPointerDown && currentShape) {
      // Drag to set end point and control point
      setCurrentShape({ ...currentShape, x2: pos.x, y2: pos.y, cx: (currentShape.x1 + pos.x) / 2, cy: (currentShape.y1 + pos.y) / 2 });
      redraw();
      return;
    }
    // Curve control point or whole curve dragging (move tool or curve edit mode)
    if ((tool === "move" || (tool === "curve" && curveEdit.idx != null)) && curveDrag.idx != null && curveDrag.point) {
      setShapes((prev) => {
        const copy = prev.map((s) => ({ ...s }));
        const curve = copy[curveDrag.idx];
        if (!curve) return prev;
        if (curveDrag.point === "start") { curve.x1 = pos.x; curve.y1 = pos.y; }
        else if (curveDrag.point === "end") { curve.x2 = pos.x; curve.y2 = pos.y; }
        else if (curveDrag.point === "control") { curve.cx = pos.x; curve.cy = pos.y; }
        else if (curveDrag.point === "all") {
          // Move the whole curve by the drag delta
          const dx = pos.x - curveDrag.offsetX;
          const dy = pos.y - curveDrag.offsetY;
          curve.x1 += dx; curve.y1 += dy;
          curve.x2 += dx; curve.y2 += dy;
          curve.cx += dx; curve.cy += dy;
          // Update offset for next move
          setCurveDrag((cd) => ({ ...cd, offsetX: pos.x, offsetY: pos.y }));
        }
        return copy;
      });
      redraw();
      return;
    }
    if (tool === "pencil" && currentShape) {
      // append point and draw immediately using a local preview
      const updated = { ...currentShape, points: [...currentShape.points, { x: pos.x, y: pos.y }] };
      setCurrentShape(updated);
      redraw();
      drawShape(ctx, updated);
    } else if (tool === "line" && currentShape) {
      const updated = { ...currentShape, x2: pos.x, y2: pos.y };
      setCurrentShape(updated);
      redraw();
      drawShape(ctx, updated);
    } else if ((tool === "rect" || tool === "square") && currentShape) {
      if (currentShape.type === "square") {
        const size = Math.max(pos.x - currentShape.x, pos.y - currentShape.y);
        const updated = { ...currentShape, w: size, h: size };
        setCurrentShape(updated);
        redraw();
        drawShape(ctx, updated);
      } else {
        const updated = { ...currentShape, w: pos.x - currentShape.x, h: pos.y - currentShape.y };
        setCurrentShape(updated);
        redraw();
        drawShape(ctx, updated);
      }
    } else if (tool === "circle" && currentShape) {
      const dx = pos.x - currentShape.x;
      const dy = pos.y - currentShape.y;
      const updated = { ...currentShape, r: Math.sqrt(dx * dx + dy * dy) };
      setCurrentShape(updated);
      redraw();
      drawShape(ctx, updated);
    } else if (tool === "oval" && currentShape) {
      const updated = { ...currentShape, rx: pos.x - currentShape.x, ry: pos.y - currentShape.y };
      setCurrentShape(updated);
      redraw();
      drawShape(ctx, updated);
    } else if (tool === "move" && moveData.idx != null) {
      // move the selected shape
      setShapes((prev) => {
        const copy = prev.map((s) => ({ ...s }));
        const s = copy[moveData.idx];
        if (!s) return prev;
        const newX = pos.x - moveData.offsetX;
        const newY = pos.y - moveData.offsetY;
        if (["rect", "square", "oval", "circle", "dot"].includes(s.type)) {
          s.x = newX;
          s.y = newY;
          if (s.type === "circle" || s.type === "dot") {
            // circle stores r already
          }
        } else if (s.type === "line") {
          const dx = newX - s.x1;
          const dy = newY - s.y1;
          s.x1 += dx; s.y1 += dy; s.x2 += dx; s.y2 += dy;
        } else if (s.type === "stroke") {
          // move every point
          const dx = newX - (s.points?.[0]?.x ?? 0);
          const dy = newY - (s.points?.[0]?.y ?? 0);
          if (s.points) s.points = s.points.map((p) => ({ x: p.x + dx, y: p.y + dy }));
        }
        return copy;
      });
      redraw();
    } else if (tool === "eraser" && isErasing && currentShape) {
      // Continue erasing as a white pencil
      const updated = { ...currentShape, points: [...currentShape.points, { x: pos.x, y: pos.y }] };
      setCurrentShape(updated);
      redraw();
    }
  };

  // Pointer up
  const handlePointerUp = (e) => {
    const pos = getMousePos(e);
    setIsPointerDown(false);

    if (tool === "curve" && currentShape) {
      // Add the curve and enter edit mode for it
      addShape(currentShape);
      setCurveEdit({ idx: shapes.length }); // new curve is last
      setCurrentShape(null);
      return;
    }
    if ((tool === "move" || (tool === "curve" && curveEdit.idx != null)) && curveDrag.idx != null) {
      setCurveDrag({ idx: null, point: null });
      return;
    }
    if (tool === "pencil" && currentShape) {
      // finalize pencil
      addShape(currentShape);
      setCurrentShape(null);
    } else if (tool === "line" && currentShape) {
      addShape(currentShape);
      setCurrentShape(null);
    } else if ((tool === "rect" || tool === "square") && currentShape) {
      addShape(currentShape);
      setCurrentShape(null);
    } else if (tool === "circle" && currentShape) {
      addShape(currentShape);
      setCurrentShape(null);
    } else if (tool === "oval" && currentShape) {
      addShape(currentShape);
      setCurrentShape(null);
    } else if (tool === "move") {
      // finish moving: keep selection (optional)
      setMoveData({ idx: null, offsetX: 0, offsetY: 0 });
    } else if (tool === "eraser") {
      setIsErasing(false);
      if (currentShape && currentShape.points && currentShape.points.length > 1) {
        // Add the eraser stroke (white) to shapes
        addShape(currentShape);
      }
      setCurrentShape(null);
    }

    redraw();
  };

  useEffect(() => {
    // ensure redraw anytime shapes or currentShape changes
    redraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shapes, currentShape, moveData]);

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Top controls row */}
  <div className="flex flex-wrap items-center gap-4 mb-2">
        {/* Color */}
        <label className="flex items-center gap-1 text-sm font-medium">
          Color
          <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} className="w-7 h-7 p-0 border-none bg-transparent" />
        </label>
        {/* Fill */}
        <label className="flex items-center gap-1 text-sm font-medium">
          Fill
          <input type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="w-7 h-7 p-0 border-none bg-transparent" />
        </label>
        {/* Size */}
        <label className="flex items-center gap-2 text-sm font-medium">
          Size
          <input type="range" min="1" max="80" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
          <span>{brushSize}px</span>
        </label>
        {/* Undo */}
        <button
          onClick={handleUndo}
          className="bg-gray-300 text-gray-800 px-3 py-1 rounded font-semibold shadow hover:bg-gray-400 transition"
          disabled={undoStack.length === 0}
        >
          Undo
        </button>
        {/* Save Image */}
        <button
          onClick={handleSaveImage}
          className="bg-green-500 text-white px-3 py-1 rounded font-semibold shadow hover:bg-green-600 transition"
        >
          Save Image
        </button>
        {/* Clear All */}
        <button
          onClick={() => { setShapes([]); setCurrentShape(null); setMoveData({ idx: null, offsetX: 0, offsetY: 0 }); setUndoStack([]); }}
          className="bg-red-400 text-white px-3 py-1 rounded font-semibold shadow hover:bg-red-500 transition"
        >
          Clear All
        </button>
      </div>

      <div className="flex gap-6">
        {/* Tools sidebar */}
        <div className="w-48 flex flex-col gap-3">
          <h3 className="font-bold text-lg">Tools</h3>
          {TOOL_OPTIONS.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTool(t.key); setCurrentShape(null); setMoveData({ idx: null, offsetX: 0, offsetY: 0 }); }}
              className={`py-2 px-3 rounded ${tool === t.key ? 'bg-yellow-300' : 'bg-gray-100'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Canvas area */}
        <div>
          <canvas
            ref={canvasRef}
            width={900}
            height={500}
            style={{ border: '2px solid #f59e0b', borderRadius: 12, background: 'white', cursor: tool === 'move' ? 'grab' : 'crosshair' }}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
          />
        </div>
      </div>

      <style>{`
        button { cursor: pointer; }
      `}</style>
    </div>
  );
}
