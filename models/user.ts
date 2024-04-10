import mongoose, { Schema } from 'mongoose';

export interface IUser {
  _id?: string;
  email: string;
  name: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: false, default: 'user' },
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
