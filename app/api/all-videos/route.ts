import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import { getAllVideos } from '@/lib/functions/video';

let isConnected = false;

export async function GET() {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    const foundVideos = await getAllVideos();
    const response = NextResponse.json(foundVideos);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while fetching Videos' },
      { status: 500 }
    );
  }
}
