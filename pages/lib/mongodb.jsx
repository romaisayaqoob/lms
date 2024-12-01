// lib/mongodb.js
import { MongoClient } from 'mongodb';

// Ensure the MongoDB URI is loaded from the environment variables
const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (!uri) {
  console.error("MongoDB URI is not defined. Please check your .env file.");
}

try {
  // This ensures the MongoDB client is only initialized once.
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to ensure MongoClient is only initialized once
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
} catch (error) {
  console.error("Failed to initialize MongoDB client:", error.message);
  throw new Error("MongoDB connection failed. Please check your MongoDB URI and network connection.");
}

export async function connectToDB() {
  try {
    const client = await clientPromise;
    console.log("Connected to MongoDB successfully.");
    return client.db('newlms');  // Adjust database name if needed
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw new Error("MongoDB connection failed. Ensure the database is running and your URI is correct.");
  }
}
