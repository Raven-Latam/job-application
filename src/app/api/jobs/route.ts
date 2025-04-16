import { NextResponse } from 'next/server';
import jobsData from '@/../db.json';

export async function GET() {
  return NextResponse.json(jobsData.jobs);
}
