import { NextResponse } from 'next/server';
import {connectDB}  from '@/utils/db';
import { register } from '@/lib/functions/user';
let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req:any) {
  const { username,password} = await req.json();

  try {
    const userData = await register(username,password);
    return NextResponse.json(userData.user);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while registering user'}
    );
  }
}
