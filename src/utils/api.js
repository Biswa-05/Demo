export async function generateKolamImage(prompt) {
  const r = await fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.image;
}

export async function generatePattern(gridSize = 5) {
  const r = await fetch("/api/generate-pattern", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gridSize }),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.pattern;
}
