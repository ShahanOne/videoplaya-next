import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import { login } from '@/lib/functions/user';
let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req:any) {
  const { username,password} = await req.json();

  try {
    const userData = await login(username,password);
    return NextResponse.json(userData.user);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while logging in '}
    );
  }
}
