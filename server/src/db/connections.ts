import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const connectMongo = async () => {
  const mongodbUrl = process.env.MONGODB_URL;

  if (!mongodbUrl) {
    throw new Error('MONGODB_URL environment variable is not defined');
  }

  return mongoose.connect(mongodbUrl);
};

module.exports = {
  connectMongo,
};
