// src/components/DotGridCanvas.jsx
import React, { useRef, useState, useEffect } from "react";

export default function DotGridCanvas({
  width = 700,
  height = 500,
  background = "#ffffff",
}) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [history, setHistory] = useState([]); // array of dataURLs

  // keep historyRef if you need direct access (not strictly required here)
  const historyRef = useRef(history);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    // Initialize canvas default styles
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    // fill background (optional)
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // default stroke style
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(255,87,34,0.95)";
    ctx.lineWidth = 3;
  }, [width, height, background]);

  // helper to get pointer coordinates relative to canvas
  const getPointerPos = (evt) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    return { x, y };
  };

  // Save current canvas state (dataURL) before starting a new stroke
  const pushState = () => {
    try {
      const canvas = canvasRef.current;
      const data = canvas.toDataURL();
      setHistory((prev) => {
        const next = [...prev, data];
        // limit history length to last 50 actions
        if (next.length > 50) next.shift();
        return next;
      });
    } catch (err) {
      console.warn("Could not push canvas state:", err);
    }
  };

  const handlePointerDown = (e) => {
    // Save state before drawing the next stroke
    pushState();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawing.current = true;

    // capture pointer for smoother input (browser support)
    if (canvas.setPointerCapture) {
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerMove = (e) => {
    if (!isDrawing.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPointerPos(e);
    // draw line to pointer
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e) => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    // release pointer capture
    const canvas = canvasRef.current;
    if (canvas.releasePointerCapture) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    }
    // Note: we DO NOT pushState here because we already saved BEFORE stroke.
  };

  const handlePointerLeave = (e) => {
    // treat leaving the canvas as finishing the stroke
    if (isDrawing.current) {
      isDrawing.current = false;
    }
  };

  const undo = () => {
    setHistory((prev) => {
      if (prev.length === 0) {
        // nothing to undo: clear to blank
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        // optional: repaint background
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        return prev;
      }

      // Remove the last saved state (which was the state BEFORE the most recent stroke)
      const newHistory = prev.slice(0, -1);
      const last = newHistory.length ? newHistory[newHistory.length - 1] : null;

      const ctx = canvasRef.current.getContext("2d");
      if (last) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = last;
      } else {
        // nothing left: clear
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      return newHistory;
    });
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory([]);
  };

  const savePNG = () => {
    try {
      const link = document.createElement("a");
      link.download = "kolam-drawing.png";
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 bg-white shadow-lg rounded-lg touch-none"
        width={width}
        height={height}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      />
      <div className="space-x-3">
        <button
          onClick={undo}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Undo
        </button>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Clear
        </button>
        <button
          onClick={savePNG}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Save PNG
        </button>
      </div>
    </div>
  );
}
