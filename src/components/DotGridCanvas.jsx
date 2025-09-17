import React, { useRef, useState } from "react";

export default function DotGridCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 🎨 Brush states
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  // 🕘 Undo stack
  const [history, setHistory] = useState([]);

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);

    // Save snapshot for undo
    const snapshot = canvasRef.current.toDataURL();
    setHistory((prev) => [...prev, snapshot]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // ↩ Undo last action
  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));

    const img = new Image();
    img.src = last;
    img.onload = () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  // 🧹 Clear canvas
  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory([]);
  };

  // 💾 Save canvas as PNG
  const saveCanvas = () => {
    const dataURL = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "drawing.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* 🎛 Controls Panel*/ }
      <div className="bg-white shadow-xl rounded-lg p-4 flex flex-wrap gap-4 items-center justify-center">
        {/* Brush Color */}
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium">Color:</span>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="w-10 h-10 p-0 border rounded"
          />
        </label>

        {/* Brush Size*/ }
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium">Size:</span>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="cursor-pointer"
          />
          <span className="text-sm">{brushSize}px</span>
        </label>

        {/* Action Buttons*/ }
        <div className="flex gap-2">
          <button
            onClick={undo}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-medium shadow"
          >
            Undo
          </button>
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow"
          >
            Clear
          </button>
          <button
            onClick={saveCanvas}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium shadow"
          >
            Save PNG
          </button>
        </div>
      </div>

      {/* 🖌 Canvas Area*/ }
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="border-2 border-gray-300 rounded-lg shadow-lg bg-white cursor-crosshair"
        style={{
          background: "linear-gradient(135deg, #FFB343 20%, #f7c81e 80%)",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}