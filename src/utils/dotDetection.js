export default function detectDots(ctx, width, height) {
  const imgData = ctx.getImageData(0, 0, width, height)
  const data = imgData.data
  const dots = []

  for (let y = 0; y < height; y += 10) {
    for (let x = 0; x < width; x += 10) {
      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // crude threshold: dark pixel cluster = dot
      if (r < 80 && g < 80 && b < 80) {
        dots.push({ x, y })
      }
    }
  }
  return dots
}
