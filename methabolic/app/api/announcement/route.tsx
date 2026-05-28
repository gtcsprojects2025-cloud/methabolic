// src/app/api/team/route.js
import { getSheetData } from '../../components/sheets';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getSheetData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}