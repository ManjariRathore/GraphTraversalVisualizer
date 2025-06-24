"use client";

import React, { useEffect, useState } from "react";
import GraphCanvas from "@/components/GraphCanvas";
import { toFlowFormat } from "@/utils/toFlowFormat";
import { generateRandomGraph } from "@/utils/graphGenerator";

type Graph = {
  nodes: number[];
  edges: [number, number, number][];
};

export default function Home() {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [startNode, setStartNode] = useState(0);
  const [algorithm, setAlgorithm] = useState("bfs");
  const [graphType, setGraphType] = useState("sparse");
  const [numNodes, setNumNodes] = useState(6);
  const [path, setPath] = useState<number[]>([]);
  const [time, setTime] = useState<string>("0");
  const [distances, setDistances] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Generate a new graph when graph type or node count changes
  useEffect(() => {
    if (isNaN(numNodes) || numNodes < 2) return;
    const newGraph = generateRandomGraph(
      numNodes,
      graphType as "sparse" | "dense"
    );
    setGraph(newGraph);
    setStartNode(0);
    setPath([]);
    setTime("0");
    setDistances([]);
  }, [graphType, numNodes]);
  
  const runTraversal = async () => {
    console.log(graph);
    setIsRunning(true);
    try {
      const body: { graph: Graph; start?: number } = { graph };
      if (algorithm !== "toposort") {
        body.start = startNode;
      }

      const res = await fetch(`/api/${algorithm}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const { result, time } = await res.json();
      setTime(time ?? "0");

      setPath(result.path ?? []);
      setDistances(algorithm === "dijkstra" ? result.distances ?? [] : []);
    } catch (error) {
      console.error("Error running algorithm:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const { nodes, edges } = toFlowFormat(
    {
      nodes: graph.nodes,
      edges: graph.edges.map(([from, to]) => [from, to]),
    },
    path
  );

  const endNode = graph.nodes.length - 1;

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-fuchsia-800 sm:text-5xl">
            Graph Traversal Visualizer
          </h1>
          <p className="mt-2 text-lg text-purple-700">
            Explore graph algorithms with interactive visualization.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Controls */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm ring-1 ring-pink-100">
              <h2 className="mb-6 text-center text-2xl font-bold text-fuchsia-800">
                Controls
              </h2>

              <div className="space-y-6">
                {/* Number of Nodes */}
                <div className="space-y-2">
                  <label
                    htmlFor="num-nodes"
                    className="text-sm font-semibold text-purple-800"
                  >
                    Number of Nodes
                  </label>
                  <input
                    id="num-nodes"
                    type="number"
                    value={numNodes}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setNumNodes(val > 50 ? 50 : val);
                    }}
                    className="w-full appearance-none rounded-xl border-pink-200 bg-white px-4 py-3 text-purple-800 shadow-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-pink-400"
                    min="2"
                    max="50"
                  />
                </div>

                {/* Graph Type */}
                <div className="space-y-2">
                  <label
                    htmlFor="graph-type"
                    className="text-sm font-semibold text-purple-800"
                  >
                    Graph Type
                  </label>
                  <select
                    id="graph-type"
                    value={graphType}
                    onChange={(e) => setGraphType(e.target.value)}
                    className="w-full cursor-pointer appearance-none rounded-xl border-pink-200 bg-white px-4 py-3 text-purple-800 shadow-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="sparse">Sparse Graph</option>
                    <option value="dense">Dense Graph</option>
                  </select>
                </div>

                {/* Algorithm */}
                <div className="space-y-2">
                  <label
                    htmlFor="algorithm"
                    className="text-sm font-semibold text-purple-800"
                  >
                    Algorithm
                  </label>
                  <select
                    id="algorithm"
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="w-full cursor-pointer appearance-none rounded-xl border-pink-200 bg-white px-4 py-3 text-purple-800 shadow-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="bfs">Breadth-First Search</option>
                    <option value="dfs">Depth-First Search</option>
                    <option value="dijkstra">Dijkstra's Algorithm</option>
                    <option value="toposort">Topological Sort</option>
                  </select>
                </div>

                {/* Start Node */}
                <div className="space-y-2">
                  <label
                    htmlFor="start-node"
                    className="text-sm font-semibold text-purple-800"
                  >
                    Start Node
                  </label>
                  <select
                    id="start-node"
                    value={startNode}
                    onChange={(e) => setStartNode(parseInt(e.target.value))}
                    className="w-full cursor-pointer appearance-none rounded-xl border-pink-200 bg-white px-4 py-3 text-purple-800 shadow-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={algorithm === "toposort"}
                  >
                    {graph.nodes.map((node) => (
                      <option key={node} value={node}>
                        Node {node}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Run Button */}
                <button
                  onClick={runTraversal}
                  disabled={isRunning}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-pink-600 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none"
                >
                  {isRunning ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Running...</span>
                    </>
                  ) : (
                    <span>Run Algorithm</span>
                  )}
                </button>
              </div>
            </div>

            {/* Algorithm Info */}
            <div className="mt-6 rounded-2xl bg-pink-100/70 p-4 ring-1 ring-pink-200/50">
              <h3 className="font-semibold text-fuchsia-800">
                Algorithm Information
              </h3>
              <p className="mt-1 text-sm text-purple-700">
                {algorithm === "bfs" &&
                  "Explores all neighbors at the current depth before moving to the next level."}
                {algorithm === "dfs" &&
                  "Explores as far as possible along each branch before backtracking."}
                {algorithm === "dijkstra" &&
                  "Finds the shortest path from the start node to all other nodes."}
                {algorithm === "toposort" &&
                  "Orders the nodes so that each node appears after all the nodes it depends on — often used for scheduling tasks or resolving dependencies."}
              </p>
            </div>
          </div>

          {/* Graph and Results */}
          <div className="lg:col-span-2">
            {/* Graph Visualizer */}
            <div className="h-[400px] w-full rounded-2xl bg-white/60 p-4 shadow-lg backdrop-blur-sm ring-1 ring-pink-100 md:h-[500px] lg:h-[600px]">
              <GraphCanvas nodes={nodes} edges={edges} />
            </div>

            {/* Results */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm ring-1 ring-pink-100">
                <h2 className="mb-4 text-xl font-bold text-fuchsia-800">
                  Performance
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-pink-50 p-3">
                    <span className="text-purple-700">Execution Time</span>
                    <span className="font-semibold text-fuchsia-800">
                      {time} ms
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-pink-50 p-3">
                    <span className="text-purple-700">Nodes Visited</span>
                    <span className="font-semibold text-fuchsia-800">
                      {path.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-pink-50 p-3">
                    <span className="text-purple-700">Total Nodes</span>
                    <span className="font-semibold text-fuchsia-800">
                      {graph.nodes.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm ring-1 ring-pink-100">
                <h2 className="mb-4 text-xl font-bold text-fuchsia-800">
                  {algorithm === "dijkstra"
                    ? "Shortest Path"
                    : "Traversal Path"}
                </h2>
                <div className="min-h-[100px] rounded-lg bg-pink-50 p-4">
                  {path.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {path.map((node, index) => (
                        <React.Fragment key={index}>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-200 text-sm font-medium text-pink-800">
                            {node}
                          </span>
                          {index < path.length - 1 && (
                            <span className="text-pink-400">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-purple-500">
                      Run an algorithm to see the path.
                    </div>
                  )}
                </div>
              </div>
            </div>
            {algorithm === "dijkstra" && (
              <div className="mt-6 rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm ring-1 ring-pink-100">
                <h2 className="mb-4 text-xl font-bold text-fuchsia-800">
                  Distances from Node {startNode}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {distances.map((dist, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-pink-50 p-2 text-center text-sm"
                    >
                      <span className="font-semibold text-purple-700">
                        Node {i}:{" "}
                      </span>
                      {dist === undefined ||
                      dist === null ||
                      dist === Infinity ? (
                        <span className="text-red-500 font-semibold">
                          Unreachable
                        </span>
                      ) : (
                        <span className="text-fuchsia-800">{dist}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
