import { Node, Edge, MarkerType } from 'reactflow';

export function toFlowFormat(
  graph: { nodes: number[]; edges: [number, number, number][] },
  path: number[] = []
) {
  // No path highlighting
  const nodes: Node[] = graph.nodes.map((id) => ({
    id: id.toString(),
    data: { label: `Node ${id}` },
    position: {
      x: (id % 4) * 200 + 100,
      y: Math.floor(id / 4) * 200 + 100,
    },
    // No special style for path
  }));

  const edges: Edge[] = graph.edges.map(([from, to, weight]) => ({
    id: `${from}-${to}`,
    source: from.toString(),
    target: to.toString(),
    type: 'default',
    markerEnd: {
      type: MarkerType.Arrow,
    },
    label: weight !== undefined ? weight.toString() : undefined,
    // No special style or animation for path
  }));

  return { nodes, edges };
}
