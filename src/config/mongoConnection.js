import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
let dbConnection;

export const connectDB = async () => {
  try {
    await client.connect();
    dbConnection = client.db();
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

export const getDB = () => {
  return dbConnection;
};
