
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/Coordimg.jpg";
import DotGridKolam from "../components/DotGridKolam";

export default function CoordinateCanvas() {
  const [coords, setCoords] = useState("");
  const [applySymmetry, setApplySymmetry] = useState(true);
  const [gridSize, setGridSize] = useState(5);
  const [inputMode, setInputMode] = useState(null); // "coordinate" or "dotgrid"
  const [dots, setDots] = useState([]); // unified dot state
  const [suggested, setSuggested] = useState(false);
  const canvasRef = useRef(null);

  // For extra scroll space
  const extraSpace = <div style={{ minHeight: '60vh' }} />;

  // Redraw canvas on relevant state changes
  useEffect(() => {
    if (!inputMode) return;
    if (dots.length) {
      drawDotsAndLines(dots, suggested || applySymmetry);
    } else {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      drawBackground(ctx, canvas);
    }
    // eslint-disable-next-line
  }, [dots, gridSize, inputMode, applySymmetry, suggested]);

  // Reset dots/coords when grid size changes
  useEffect(() => {
    setDots([]);
    setCoords("");
    setSuggested(false);
    // eslint-disable-next-line
  }, [gridSize, inputMode]);

  // Draw background + base grid
  const drawBackground = (ctx, canvas) => {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(10, 20, 40, 0.95)")
    gradient.addColorStop(1, "rgba(20, 40, 60, 0.95)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "rgba(0,255,200,0.15)"
    ctx.lineWidth = 1
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
  }

  // Parse coordinates from textarea
  const parseCoords = (coordStr) => {
    const lines = coordStr.split("\n").map((l) => l.trim()).filter(Boolean);
    let result = [];
    lines.forEach((line) => {
      const parts = line.split("->").map((p) => p.trim());
      if (parts.length === 2) {
        const [x1, y1] = parts[0].split(",").map(Number);
        const [x2, y2] = parts[1].split(",").map(Number);
        if (!isNaN(x1) && !isNaN(y1)) result.push({ x: x1, y: y1 });
        if (!isNaN(x2) && !isNaN(y2)) result.push({ x: x2, y: y2 });
      } else {
        const [x, y] = line.split(",").map(Number);
        if (!isNaN(x) && !isNaN(y)) result.push({ x, y });
      }
    });
    return result;
  };

  // Draw dots and lines (with symmetry if enabled)
  const drawDotsAndLines = (dotsArr, symmetric = false) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx, canvas);
    // Draw dots
    dotsArr.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,165,0,0.9)";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "gold";
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    // Draw lines between consecutive dots
    if (dotsArr.length > 1) {
      ctx.strokeStyle = "#1976d2";
      ctx.lineWidth = 3;
      for (let i = 1; i < dotsArr.length; i++) {
        ctx.beginPath();
        ctx.moveTo(dotsArr[i - 1].x, dotsArr[i - 1].y);
        ctx.lineTo(dotsArr[i].x, dotsArr[i].y);
        ctx.stroke();
        if (symmetric) drawSymmetricCurve(ctx, canvas, dotsArr[i - 1], dotsArr[i]);
      }
    }
  };

  // Suggest next dots and draw symmetric lines
  const suggestKolam = () => {
    // For demo: add a symmetric dot for each existing dot (across center)
    if (!dots.length) return;
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // Add symmetric dots
    let newDots = [...dots];
    dots.forEach(({ x, y }) => {
      const sx = 2 * centerX - x;
      const sy = 2 * centerY - y;
      // Only add if not already present
      if (!newDots.some(d => Math.abs(d.x - sx) < 1e-2 && Math.abs(d.y - sy) < 1e-2)) {
        newDots.push({ x: sx, y: sy });
      }
    });
    setDots(newDots);
    drawDotsAndLines(newDots, true);
    setSuggested(true);
  };

  // (drawKolam removed, handled by drawDotsAndLines and suggestKolam)

  // Helper: Draw symmetric curves
  const drawSymmetricCurve = (ctx, canvas, p1, p2) => {
    let pairs = [
      [p1, p2],
      [{ x: canvas.width - p1.x, y: p1.y }, { x: canvas.width - p2.x, y: p2.y }],
      [{ x: p1.x, y: canvas.height - p1.y }, { x: p2.x, y: canvas.height - p2.y }],
    ]

    ctx.strokeStyle = "rgba(0,255,200,0.8)"
    ctx.lineWidth = 2
    ctx.shadowBlur = 10
    ctx.shadowColor = "cyan"

    pairs.forEach(([a, b]) => {
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 - 40, b.x, b.y)
      ctx.stroke()
    })

    ctx.shadowBlur = 0
  }

  // Save drawing as PNG
  const saveCanvas = () => {
    const link = document.createElement("a")
    link.download = "kolam.png"
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  // Clear screen
  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground(ctx, canvas)
  }

  return (
    <div
      className="relative min-h-screen py-10 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl mb-6 px-4 py-2 rounded-2xl font-serif tracking-wide shadow-2xl border-2 border-yellow-300 animate-gradient-x"
        initial={{ opacity: 0, scale: 0.7, y: -60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, type: "spring" }}
      >
        <span className="inline-block animate-bounce">✨</span> <span className="font-black tracking-widest">Kolam Symmetry Studio</span> <span className="inline-block animate-bounce">✨</span>
      </motion.h1>

      {/* Input mode selector */}
      {!inputMode && (
        <motion.div
          className="flex justify-center mb-8 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.06, rotate: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-green-300 text-white font-extrabold text-base shadow-xl border border-blue-300 hover:from-blue-600 hover:to-green-400 transition-all duration-300 tracking-wide font-mono"
            onClick={() => { setInputMode("coordinate"); setDots([]); setSuggested(false); }}
          >
            <span className="drop-shadow-lg">Coordinate Input</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.06, rotate: 2 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded-xl bg-gradient-to-br from-orange-500 via-pink-400 to-yellow-300 text-white font-extrabold text-base shadow-xl border border-orange-300 hover:from-orange-600 hover:to-yellow-400 transition-all duration-300 tracking-wide font-mono"
            onClick={() => { setInputMode("dotgrid"); setDots([]); setSuggested(false); }}
          >
            <span className="drop-shadow-lg">Direct Dot Grid</span>
          </motion.button>
        </motion.div>
      )}

      {/* Main grid and controls */}
      {inputMode && (
        <motion.div
          className="flex flex-col items-center text-base"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#fef9c3" }}
              whileTap={{ scale: 0.97 }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-br from-gray-100 via-yellow-100 to-pink-100 text-gray-700 font-bold text-sm shadow border border-yellow-300 hover:from-yellow-200 hover:to-pink-200 transition-all duration-300 font-mono"
              onClick={() => { setInputMode(null); setCoords(""); setDots([]); setSuggested(false); }}
            >
              ← Change Input Mode
            </motion.button>
            <motion.label
              className="flex items-center space-x-2 text-pink-700 font-bold text-base bg-white/70 px-2 py-1.5 rounded-lg border border-pink-200 shadow"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <input
                type="checkbox"
                checked={applySymmetry}
                onChange={e => setApplySymmetry(e.target.checked)}
                className="accent-pink-500 scale-125"
              />
              <span>Symmetry</span>
            </motion.label>
            <motion.div
              className="flex items-center space-x-2 bg-white/80 px-2 py-1.5 rounded-lg border border-cyan-200 shadow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <label className="text-cyan-700 font-bold text-base">Grid Size:</label>
              <select
                value={gridSize}
                onChange={e => setGridSize(parseInt(e.target.value))}
                className="px-2 py-1 rounded bg-cyan-50 border border-cyan-400 text-cyan-700 font-bold text-base shadow"
              >
                <option value={3}>3 × 3</option>
                <option value={5}>5 × 5</option>
                <option value={7}>7 × 7</option>
              </select>
            </motion.div>
          </motion.div>

          {/* Unified grid system */}
          <motion.div
            className="flex flex-col md:flex-row gap-8 items-start"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="border-4 border-cyan-400 rounded-2xl shadow-xl mb-2 bg-white/80"
              />
              {suggested && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={saveCanvas}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 text-white font-bold text-base shadow hover:from-green-500 hover:to-blue-500 mt-2 tracking-wide"
                >
                  💾 Save Image
                </motion.button>
              )}
            </motion.div>
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {inputMode === "coordinate" && (
                <>
                  <motion.textarea
                    value={coords}
                    onChange={e => {
                      setCoords(e.target.value);
                      setDots(parseCoords(e.target.value));
                      setSuggested(false);
                      drawDotsAndLines(parseCoords(e.target.value), false);
                    }}
                    className="border-2 border-pink-300 p-3 w-64 h-40 font-mono text-base rounded-xl bg-gradient-to-br from-pink-50 via-yellow-50 to-cyan-50 text-pink-700 shadow focus:ring-2 focus:ring-pink-200 transition-all duration-300"
                    placeholder={"Enter coordinates:\n50,50 -> 200,200\n100,100"}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => drawDotsAndLines(dots, applySymmetry)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-green-300 text-white font-bold text-base shadow hover:from-blue-600 hover:to-green-400 transition-all duration-300 mt-2"
                  >
                    🖊 Draw
                  </motion.button>
                </>
              )}
              {inputMode === "dotgrid" && (
                <>
                  <DotGridKolam
                    gridSize={gridSize}
                    onPatternChange={dotsArr => {
                      setDots(dotsArr.map(([x, y]) => ({ x, y }))); 
                      setCoords(dotsArr.map(([x, y]) => `${x},${y}`).join("\n"));
                      setSuggested(false);
                      drawDotsAndLines(dotsArr.map(([x, y]) => ({ x, y })), false);
                    }}
                  />
                  <span
                    className="text-sm text-gray-900 font-semibold mt-1 font-sans tracking-wide drop-shadow-sm"
                    style={{ textShadow: '0 1px 4px #fff, 0 0px 2px #222' }}
                  >
                    Click on the grid to add dots. Dots will be joined automatically and coordinates will appear above.
                  </span>
                </>
              )}
              <motion.button
                whileHover={{ scale: 1.07, rotate: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={suggestKolam}
                className="px-5 py-2 rounded-xl bg-gradient-to-br from-yellow-400 via-pink-400 to-cyan-400 text-white font-extrabold text-lg shadow-xl hover:from-yellow-500 hover:to-cyan-500 mt-3 tracking-wide"
                disabled={!dots.length}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                🔀 Suggest Kolam
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      {/* Coming Soon Pop-up (now in normal flow, below grid) */}
      <div className="w-full flex justify-center mt-10">
        <div className="px-6 py-3 rounded-2xl shadow-xl border-2 border-cyan-400 bg-gradient-to-r from-cyan-100 via-blue-50 to-cyan-200/90 backdrop-blur-xl flex flex-col items-center max-w-3xl">
          <span className="block text-lg md:text-2xl font-extrabold bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-wide mb-1 drop-shadow-lg uppercase text-center">
            coming soon !!
          </span>
          <span className="block text-base md:text-lg font-semibold text-cyan-900 text-center mb-1">
            The user can give random coordinates, and the model will suggest the next coordinates to build a good kolam design. After the final design is made, the AI model will enhance it. We can achieve this by CNN model training and ML integration. Stay updated, coming soon.
          </span>
        </div>
      </div>
      {extraSpace}
    </div>
  );
}
