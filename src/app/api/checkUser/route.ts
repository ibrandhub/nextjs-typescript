import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import { User } from '../../../../models/user';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { email } = await request.json();
    const user = await User.findOne({ email }).select('_id');

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while registering user',
      status: 500,
    });
  }
}
