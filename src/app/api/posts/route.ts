import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Endpoint non implémenté' }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ message: 'Endpoint non implémenté' }, { status: 501 });
}