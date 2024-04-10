import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongodb';
import { User } from '../../../../../models/user';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const users = await User.findOne({ _id: params.id });

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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, role } = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(params.id, { name, role });

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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    await User.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: 'User deleted successfully!',
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while updating user',
      status: 500,
    });
  }
}
