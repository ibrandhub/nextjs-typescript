import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import { User } from '../../../../models/user';

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find({ role: 'user' });

    return NextResponse.json({
      users,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while fetching users',
      status: 500,
    });
  }
}
