// Utility: Generate mathematical symmetric kolam patterns
// Returns an array of dots [{x, y}] and lines [{from: {x, y}, to: {x, y}}]

export function generateSymmetricKolam(gridSize = 5, type = 'classic') {
  // Centered grid
  const spacing = 60;
  const startX = 80;
  const startY = 80;
  let dots = [];
  let lines = [];

  // Place dots in a grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      dots.push({ x: startX + j * spacing, y: startY + i * spacing });
    }
  }

  // Connect horizontally and vertically for a symmetric pattern
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Horizontal lines
      if (j < gridSize - 1) {
        lines.push({
          from: { x: startX + j * spacing, y: startY + i * spacing },
          to: { x: startX + (j + 1) * spacing, y: startY + i * spacing }
        });
      }
      // Vertical lines
      if (i < gridSize - 1) {
        lines.push({
          from: { x: startX + j * spacing, y: startY + i * spacing },
          to: { x: startX + j * spacing, y: startY + (i + 1) * spacing }
        });
      }
    }
  }

  // Add symmetric diagonal connections for a more kolam-like look
  for (let i = 0; i < gridSize - 1; i++) {
    for (let j = 0; j < gridSize - 1; j++) {
      lines.push({
        from: { x: startX + j * spacing, y: startY + i * spacing },
        to: { x: startX + (j + 1) * spacing, y: startY + (i + 1) * spacing }
      });
      lines.push({
        from: { x: startX + (j + 1) * spacing, y: startY + i * spacing },
        to: { x: startX + j * spacing, y: startY + (i + 1) * spacing }
      });
    }
  }

  return { dots, lines };
}

// Add more pattern types as needed
