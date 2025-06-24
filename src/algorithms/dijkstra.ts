type Edge = [number, number, number]; // [from, to, weight]
type Graph = { nodes: number[]; edges: Edge[] };
type DijkstraResult = { distances: number[]; path: number[] };

// Overload signatures
export function dijkstra(graph: Graph): Record<number, DijkstraResult>;
export function dijkstra(graph: Graph, start: number): DijkstraResult;

// Main implementation
export function dijkstra(graph: Graph, start?: number): any {
  const n = graph.nodes.length;

  function dijkstraFrom(startNode: number): DijkstraResult {
    const distances = Array(n).fill(Infinity);
    const previous = Array(n).fill(-1);
    const visited = new Set<number>();

    distances[startNode] = 0;

    while (visited.size < n) {
      let current = -1;

      // Find the unvisited node with the smallest distance
      for (let i = 0; i < n; i++) {
        if (!visited.has(i) && (current === -1 || distances[i] < distances[current])) {
          current = i;
        }
      }

      // No reachable node found
      if (current === -1 || distances[current] === Infinity) break;

      visited.add(current);

      // Relax edges from the current node
      for (const [from, to, weight] of graph.edges) {
        if (from === current && distances[from] + weight < distances[to]) {
          distances[to] = distances[from] + weight;
          previous[to] = from;
        }
      }
    }

    // Reconstruct path to the last node only if reachable
    const endNode = n - 1;
    const path: number[] = [];

    if (distances[endNode] !== Infinity) {
      for (let at = endNode; at !== -1; at = previous[at]) {
        path.push(at);
      }
      path.reverse();
    }

    return { distances, path };
  }

  // If a start node is provided, return result from that node
  if (start !== undefined) {
    return dijkstraFrom(start);
  }

  // If no start node, return results from all nodes
  const allResults: Record<number, DijkstraResult> = {};
  for (const node of graph.nodes) {
    allResults[node] = dijkstraFrom(node);
  }

  return allResults;
}
