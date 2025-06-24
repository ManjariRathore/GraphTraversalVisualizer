export function toposort(graph: { nodes: number[]; edges: [number, number][] }): number[] {
  const inDegree = new Map<number, number>();
  const adj = new Map<number, number[]>();

  // Initialize
  for (const node of graph.nodes) {
    inDegree.set(node, 0);
    adj.set(node, []);
  }

  // Build graph
  for (const [u, v] of graph.edges) {
    inDegree.set(v, (inDegree.get(v) || 0) + 1);
    adj.get(u)?.push(v);
  }

  const queue: number[] = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) queue.push(node);
  }

  const result: number[] = [];

  while (queue.length) {
    const u = queue.shift()!;
    result.push(u);

    for (const v of adj.get(u)!) {
      inDegree.set(v, inDegree.get(v)! - 1);
      if (inDegree.get(v) === 0) queue.push(v);
    }
  }

  return result.length === graph.nodes.length ? result : [];
}
