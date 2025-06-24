# Graph Traversal Visualizer

## Project Overview

Graph Traversal Visualizer is an interactive web application built with Next.js and ReactFlow that allows users to explore and visualize classic graph algorithms. Users can generate random graphs, select traversal algorithms, and see step-by-step how each algorithm explores the graph. This tool is ideal for students, educators, and anyone interested in understanding graph algorithms visually.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- **Interactive graph visualization** for Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's Algorithm, and Topological Sort
- **Edge weights** are displayed as labels on the edges in the graph UI
- **Adjustable number of nodes** and graph density (sparse/dense)
- **Visual feedback** for traversal path and node visitation
- **Performance metrics**: execution time, nodes visited, and distances (for Dijkstra)
- **Modern, responsive UI** with easy-to-use controls

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd graph-traversal-next
npm install
# or
yarn install
```

## Usage

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### UI Controls

- **Number of Nodes:** Set the number of nodes in the graph (2–50).
- **Graph Type:** Choose between a sparse or dense graph.
- **Algorithm:** Select BFS, DFS, Dijkstra's Algorithm, or Topological Sort.
- **Start Node:** Choose the starting node (not applicable for Topological Sort).
- **Run Algorithm:** Execute the selected algorithm and visualize the result.

## Graph Algorithms Supported

- **Breadth-First Search (BFS):** Explores all neighbors at the current depth before moving to the next level.
- **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking.
- **Dijkstra's Algorithm:** Finds the shortest path from the start node to all other nodes. Edge weights are used in path calculations and displayed on the graph.
- **Topological Sort:** Orders the nodes so that each node appears after all the nodes it depends on (for directed acyclic graphs).

## Customization

- **Number of Nodes:** Use the input box to set the number of nodes (minimum 2, maximum 50).
- **Graph Density:** Select 'Sparse' for fewer edges or 'Dense' for more interconnected graphs.
- **Edge Weights:** Randomly generated and displayed on the graph. (Weights are used by Dijkstra's Algorithm.)
- **Algorithm Selection:** Use the dropdown to switch between supported algorithms.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
