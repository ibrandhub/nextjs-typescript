import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongodb';
import { User } from '../../../../../models/user';

export async function GET(request: Request) {
  try {
    // await connectMongoDB();
    // const { email } = await request.json();
    // console.log('email', email);

    // const user = await User.findOne({ email }).select('_id');

    // return NextResponse.json({ user });
    return NextResponse.json({ message: 'GET method' });
  } catch (error) {
    console.log('error', error);

    return NextResponse.json({
      message: 'An error occurred while registering user',
      status: 500,
    });
  }
}
