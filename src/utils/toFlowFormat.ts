import { Node, Edge, MarkerType } from 'reactflow';

export function toFlowFormat(
  graph: { nodes: number[]; edges: [number, number][] },
  path: number[] = []
) {
  const pathSet = new Set(path);

  const nodes: Node[] = graph.nodes.map((id) => ({
    id: id.toString(),
    data: { label: `Node ${id}` },
    position: {
      x: (id % 4) * 200 + 100,
      y: Math.floor(id / 4) * 200 + 100,
    },
    style: pathSet.has(id)
      ? { border: '3px solid #2563eb', backgroundColor: '#dbeafe' }
      : {},
  }));

  const edges: Edge[] = graph.edges.map(([from, to]) => {
    const isInPath =
      path.includes(from) &&
      path.includes(to) &&
      Math.abs(path.indexOf(from) - path.indexOf(to)) === 1;

    return {
      id: `${from}-${to}`,
      source: from.toString(),
      target: to.toString(),
      type: 'default',
      animated: isInPath,
      markerEnd: {
        type: MarkerType.Arrow, // ✅ This enables arrowhead
      },
      style: isInPath ? { stroke: '#2563eb', strokeWidth: 2 } : {},
    };
  });

  return { nodes, edges };
}
