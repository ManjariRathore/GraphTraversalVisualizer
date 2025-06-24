import { NextRequest, NextResponse } from 'next/server';
import { dijkstra } from '@/algorithms/dijkstra';

export async function POST(req: NextRequest) {
  const { graph, start } = await req.json();
  const startTime = performance.now()
  const result = dijkstra(graph, start);
  const endTime = performance.now()
  const time = (endTime - startTime).toFixed(2);
  return NextResponse.json({ result, time });

}