type Graph = { edges: [number, number][], nodes: number[] };

export function bfs(graph: Graph): { path: number[] };
export function bfs(graph: Graph, start: number): { path: number[] };

export function bfs(graph: Graph, start?: number): { path: number[] } {
  const path: number[] = [];
  const seen = new Set<number>();

  function bfsFromNode(startNode: number) {
    const queue = [startNode];
    seen.add(startNode);

    while (queue.length > 0) {
      const node = queue.shift()!;
      path.push(node);

      for (const [a, b] of graph.edges) {
        if (a === node && !seen.has(b)) {
          queue.push(b);
          seen.add(b);
        } else if (b === node && !seen.has(a)) {
          queue.push(a);
          seen.add(a);
        }
      }
    }
  }

  if (start !== undefined) {
    bfsFromNode(start);
  } else {
    for (const node of graph.nodes) {
      if (!seen.has(node)) {
        bfsFromNode(node);
      }
    }
  }

  return { path };
}
