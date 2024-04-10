import { connectMongoDB } from '../../lib/mongodb';
import { User } from '../../models/user';

export const getUserByID = async (id: string) => {
  try {
    await connectMongoDB();
    const user = await User.findOne({ _id: id });

    return user;
  } catch (error) {
    return null;
  }
};
