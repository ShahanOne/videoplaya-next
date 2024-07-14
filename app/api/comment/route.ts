import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import { comment } from '@/lib/functions/video';
let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req:any) {
  const { videoId,newComment } = await req.json();

  try {
    const videoData = await comment(videoId,newComment);
    return NextResponse.json(videoData.video);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while creating video' },
      { status: 500 }
    );
  }
}
