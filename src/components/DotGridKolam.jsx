import React, { useRef, useEffect, useState } from "react";

// A grid where users can click to add dots, and lines/curves are drawn automatically
export default function DotGridKolam({ gridSize = 5, onPatternChange }) {
  const canvasRef = useRef(null);
  const [dots, setDots] = useState([]);
  const spacing = 60;
  const startX = 40;
  const startY = 40;
  const canvasSize = spacing * (gridSize - 1) + startX * 2;

  // Draw grid, dots, and lines
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw grid
    ctx.strokeStyle = "#e0e0e0";
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        ctx.beginPath();
        ctx.arc(startX + j * spacing, startY + i * spacing, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffe082";
        ctx.fill();
      }
    }
    // Draw user dots
    dots.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = "#ff9800";
      ctx.fill();
    });
    // Draw lines between consecutive dots
    ctx.strokeStyle = "#1976d2";
    ctx.lineWidth = 3;
    for (let i = 1; i < dots.length; i++) {
      ctx.beginPath();
      ctx.moveTo(dots[i - 1][0], dots[i - 1][1]);
      ctx.lineTo(dots[i][0], dots[i][1]);
      ctx.stroke();
    }
  }, [dots, gridSize]);

  // Handle click to add dot
  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Snap to nearest grid intersection
    const gridX = Math.round((x - startX) / spacing);
    const gridY = Math.round((y - startY) / spacing);
    if (
      gridX >= 0 && gridX < gridSize &&
      gridY >= 0 && gridY < gridSize
    ) {
      const px = startX + gridX * spacing;
      const py = startY + gridY * spacing;
      // Prevent duplicate
      if (!dots.some(([dx, dy]) => dx === px && dy === py)) {
        const newDots = [...dots, [px, py]];
        setDots(newDots);
        if (onPatternChange) onPatternChange(newDots);
      }
    }
  };

  // Reset dots
  const reset = () => setDots([]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="border-2 border-yellow-400 rounded-lg bg-white shadow mb-2 cursor-crosshair"
        onClick={handleCanvasClick}
      />
      <button
        className="px-3 py-1 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 text-xs"
        onClick={reset}
      >
        Reset Dots
      </button>
    </div>
  );
}
