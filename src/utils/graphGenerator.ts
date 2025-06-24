export function generateRandomGraph(n: number, density: 'sparse' | 'dense') {
  const edges: [number, number, number][] = [];
  const maxEdges = density === 'dense' ? n * (n - 1) : n;

  while (edges.length < maxEdges) {
    const u = Math.floor(Math.random() * n);
    const v = Math.floor(Math.random() * n);
    if (u !== v && !edges.some(([a, b]) => a === u && b === v)) {
      const weight = Math.floor(Math.random() * 10) + 1;
      edges.push([u, v, weight]);
    }
  }

  return {
    nodes: Array.from({ length: n }, (_, i) => i),
    edges,
  };
}
