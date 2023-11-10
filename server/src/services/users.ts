import { config } from 'dotenv';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users, User } from '../db/usersModel';

config();

interface SignUpBody {
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface RefreshTokenBody {
  token: string;
}

export const signupUser = async (body: SignUpBody): Promise<User | null> => {
  const { email, password } = body;
  const hashedPassword = await bcryptjs.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

  await Users.create({ email, password: hashedPassword });

  let user: User | null = await Users.findOne({ email });

  if (!user) return null;
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment.');
  }

  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_REFRESH,
  });

  user = await Users.findOneAndUpdate({ email }, { token, refreshToken }, { new: true });

  if (!user) return null;

  return user;
};

export const loginUser = async (body: LoginBody): Promise<User | null> => {
  const { email, password } = body;
  let user = await Users.findOne({ email });

  if (!user) return null;

  const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment.');
  }

  if (isPasswordCorrect) {
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN_REFRESH,
    });

    user = await Users.findOneAndUpdate({ email }, { token, refreshToken }, { new: true });
    return user;
  }

  if (!user) return null;

  return null;
};

export const logoutUser = async (token: string): Promise<User | null> => {
  const user = await Users.findOneAndUpdate({ token }, { token: null, refreshToken: null }, { new: true });
  return user;
};

export const currentUser = async (token: string): Promise<{ email: string } | null> => {
  const user = await Users.findOne({ token }, { email: 1, _id: 0 });
  return user ? { email: user.email } : null;
};

export const refreshMToken = async (body: RefreshTokenBody): Promise<User | null> => {
  const { token } = body;
  const userOld = await Users.findOne({ token }, { email: 1, _id: 1 });

  if (!userOld) return null;
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment.');
  }

  const accessToken = jwt.sign({ sub: userOld._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ sub: userOld._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_REFRESH,
  });

  const user = await Users.findOneAndUpdate({ token }, { token: accessToken, refreshToken }, { new: true });

  if (!user) return null;

  return user;
};
