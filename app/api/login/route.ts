import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import { login } from '@/lib/functions/user';
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
    
    const user = await login(username,password);   
    
    if (!user) {
      throw new Error('User not found'); // Handle case where login returns undefined or null
    } 
    return NextResponse.json(user.user);
  } catch (err) {
    console.log(err);
    
    return NextResponse.json(
      { error: 'An error occurred while logging in '}
    );
  }
}
