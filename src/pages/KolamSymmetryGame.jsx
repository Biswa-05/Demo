
import React, { useRef, useState } from "react";

export default function KolamSymmetryGame() {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [message, setMessage] = useState("");

  const canvasSize = 400;
  const gridSpacing = 40;
  const gridCount = canvasSize / gridSpacing;
  const center = canvasSize / 2;

  // Draw all points and their symmetric counterparts
  const draw = (ctx, pts) => {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    // Draw grid
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 1.5;
    for (let i = 0; i <= canvasSize; i += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvasSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvasSize, i);
      ctx.stroke();
    }
    // Draw axis
    ctx.strokeStyle = "#fb7185";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(center, 0);
    ctx.lineTo(center, canvasSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, center);
    ctx.lineTo(canvasSize, center);
    ctx.stroke();
    // Draw grid intersection dots (faint)
    for (let i = 0; i <= gridCount; i++) {
      for (let j = 0; j <= gridCount; j++) {
        ctx.beginPath();
        ctx.arc(i * gridSpacing, j * gridSpacing, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "#fde68a";
        ctx.fill();
      }
    }
    // Draw user points (strong)
    pts.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, 2 * Math.PI);
      ctx.fillStyle = "#f59e42";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvasSize - x, y, 7, 0, 2 * Math.PI);
      ctx.fillStyle = "#60a5fa";
      ctx.fill();
    });
  };

  // Redraw on points change
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      draw(ctx, points);
    }
  }, [points]);

  // Only allow placing dots on grid intersections, always add mirror
  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Snap to nearest grid intersection
    const gridX = Math.round(x / gridSpacing) * gridSpacing;
    const gridY = Math.round(y / gridSpacing) * gridSpacing;
    // Only allow if snapped point is within grid
    if (
      gridX < 0 || gridX > canvasSize ||
      gridY < 0 || gridY > canvasSize
    ) {
      setMessage("Please click on a grid intersection.");
      return;
    }
    // Prevent duplicate points
    const key = (a, b) => `${a},${b}`;
    const mirrorX = canvasSize - gridX;
    const existing = new Set(points.map(([a, b]) => key(a, b)));
    // Add both the clicked point and its mirror (unless on center line)
    let newPoints = [];
    if (!existing.has(key(gridX, gridY))) {
      newPoints.push([gridX, gridY]);
    }
    if (gridX !== mirrorX && !existing.has(key(mirrorX, gridY))) {
      newPoints.push([mirrorX, gridY]);
    }
    if (newPoints.length === 0) {
      setMessage("Dot already placed at this intersection (and its mirror).");
      return;
    }
    setPoints((pts) => [...pts, ...newPoints]);
    setMessage("");
  };

  // Check symmetry (now always valid if all points have their mirror)
  const checkSymmetry = () => {
    const key = (a, b) => `${a},${b}`;
    const pointSet = new Set(points.map(([a, b]) => key(a, b)));
    let symmetric = true;
    for (let [x, y] of points) {
      const mirrorX = canvasSize - x;
      if (!pointSet.has(key(mirrorX, y))) {
        symmetric = false;
        break;
      }
    }
    setMessage(symmetric ? "Great! Your pattern is symmetric." : "Try again! Not all points are symmetric.");
  };

  // Reset
  const reset = () => {
    setPoints([]);
    setMessage("");
  };

  // Example symmetric grid (3x3) with dots
  const ExampleSymmetricGrid = () => {
    const size = 60;
    const spacing = 20;
    const dots = [
      [0, 1], [2, 1], // symmetric dots across center
      [1, 0], [1, 2], // symmetric dots across center
    ];
    return (
      <svg width={size} height={size} style={{ background: '#fff', borderRadius: 8, border: '2px solid #fbbf24', boxShadow: '0 2px 8px #fbbf2433' }}>
        {/* Grid lines */}
        {[0, 1, 2].map(i => (
          <>
            <line key={`v${i}`} x1={i * spacing + 10} y1={10} x2={i * spacing + 10} y2={size - 10} stroke="#fbbf24" strokeWidth="1.5" />
            <line key={`h${i}`} x1={10} y1={i * spacing + 10} x2={size - 10} y2={i * spacing + 10} stroke="#fbbf24" strokeWidth="1.5" />
          </>
        ))}
        {/* Center axis */}
        <line x1={size/2} y1={10} x2={size/2} y2={size-10} stroke="#fb7185" strokeWidth="2" />
        {/* Dots */}
        {dots.map(([x, y], idx) => (
          <circle key={idx} cx={x * spacing + 10} cy={y * spacing + 10} r="5" fill="#f59e42" />
        ))}
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-50 rounded-2xl shadow-xl p-6">
      <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-400 to-pink-400 drop-shadow-lg tracking-tight text-center w-full">Kolam Symmetry Game</h2>
      <p className="mb-4 text-lg text-gray-700 text-center max-w-xl w-full">Click only on the grid intersections to add points. Each point will be mirrored across the vertical axis. Try to make a symmetric Kolam pattern!</p>
      <div className="flex flex-row w-full mb-4">
  <div className="flex-1 flex justify-center items-center ml-32">
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            className="border-4 border-orange-200 rounded-xl bg-white shadow-lg cursor-crosshair"
            onClick={handleCanvasClick}
          />
        </div>
        <div className="flex flex-col items-end min-w-[110px] pr-2">
          <span className="text-xs text-gray-500 mb-1 text-right">Example Symmetric Grid</span>
          <ExampleSymmetricGrid />
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center justify-center w-full mb-2">
        <button
          onClick={reset}
          className="px-5 py-2 rounded-full bg-orange-400 text-white font-bold shadow hover:bg-orange-500 transition"
        >
          Reset
        </button>
        <button
          onClick={checkSymmetry}
          className="px-5 py-2 rounded-full bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition"
        >
          Check Symmetry
        </button>
      </div>
      {message && (
        <div className={`mt-2 text-lg font-semibold text-center w-full ${message.includes('Great') ? 'text-green-600' : 'text-pink-600'}`}>{message}</div>
      )}
      <div className="mt-6 text-xs text-gray-500 text-center max-w-md w-full">
        <span className="font-semibold text-orange-600">Symmetry Tip:</span> For every dot you place, make sure there is a matching dot at the same height on the opposite side of the center line (vertical axis)!
      </div>
    </div>
  );
}
