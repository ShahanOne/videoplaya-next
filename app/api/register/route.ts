import { NextResponse } from 'next/server';
import {connectDB}  from '@/utils/db';
import { register } from '@/lib/functions/user';
let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req:Request) {

  try {
     const body = await req.json();
    const userData = body[0];
    const { username, password } = userData;
    console.log(username,password);
    const user = await register(username,password);
    return NextResponse.json(user.user);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while registering user'}
    );
  }
}
