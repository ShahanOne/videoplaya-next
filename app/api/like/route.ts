import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import { like } from '@/lib/functions/video';
let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req:any) {
  const { videoId,userId } = await req.json();

  try {
    const videoData = await like(videoId,userId);
    return NextResponse.json(videoData.user);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while creating video' },
      { status: 500 }
    );
  }
}
