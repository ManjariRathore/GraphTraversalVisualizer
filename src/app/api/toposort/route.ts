import { NextRequest, NextResponse } from 'next/server';
import { toposort } from '@/algorithms/toposort';

export async function POST(req: NextRequest) {
  const { graph } = await req.json();
  const startTime = performance.now();
  const path = toposort(graph);
  const endTime = performance.now();

  const time = (endTime - startTime).toFixed(2);
  return NextResponse.json({ result: { path }, time });
  
}
