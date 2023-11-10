import { Document, Schema, model, Model, Types } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  password: string;
  email: string;
  token: string;
  refreshToken: string;
  sid: string;
}

const usersSchema = new Schema<User & Document>({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  sid: {
    type: String,
    default: null,
  },
});

const Users: Model<User & Document> = model('users', usersSchema);

export { Users };
