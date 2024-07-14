import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import { createVideo } from '@/lib/functions/video';
let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req:any) {
  const { title, url,userId } = await req.json();

  try {
    const newVideo = await createVideo(title,url,userId);
    return NextResponse.json(newVideo);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while creating video' },
      { status: 500 }
    );
  }
}
