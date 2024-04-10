import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import { User } from '../../../../models/user';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 12);

    await connectMongoDB();
    await User.create({
      email,
      name,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: 'User registered successfully!',
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while registering user',
      status: 500,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { name } = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(params.id, { name });

    return NextResponse.json({
      message: 'User updated successfully!',
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while updating user',
      status: 500,
    });
  }
}
