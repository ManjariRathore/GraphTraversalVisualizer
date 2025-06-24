type Graph = { edges: [number, number][], nodes: number[] };

export function dfs(graph: Graph): { path: number[] };
export function dfs(graph: Graph, start: number): { path: number[] };

export function dfs(graph: Graph, start?: number): { path: number[] } {
  const path: number[] = [];
  const seen = new Set<number>();

  function dfsHelper(node: number) {
    path.push(node);
    seen.add(node);
    for (const [from, to] of graph.edges) {
      if (from === node && !seen.has(to)) {
        dfsHelper(to);
      } else if (to === node && !seen.has(from)) {
        dfsHelper(from);
      }
    }
  }

  if (start !== undefined) {
    dfsHelper(start);
  } else {
    for (const node of graph.nodes) {
      if (!seen.has(node)) {
        dfsHelper(node);
      }
    }
  }

  return { path };
}
