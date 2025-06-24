// GraphCanvas.tsx
"use client";

import React from "react";
import ReactFlow, { Background, Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

type Props = {
  nodes: Node[];
  edges: Edge[];
};

const nodeTypes = {};

export default function GraphCanvas({ nodes, edges }: Props) {
  return (
    <div
      style={{ width: "100%", height: 500 }}
      className="my-6 border rounded shadow"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{ type: "default" }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
