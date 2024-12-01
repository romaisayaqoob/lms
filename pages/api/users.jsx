// pages/api/users.js
import { connectToDB } from "../lib/mongodb";

export default async function handler(req, res) {
  try {
    const db = await connectToDB();
    const usersCollection = db.collection("users");

    if (req.method === "POST") {
      // Handle user creation
      const { firebaseId, email } = req.body;

      if (!firebaseId || !email) {
        return res.status(400).json({ error: "Missing required fields: firebaseId, or email" });
      }

      try {
        // Create a new user document
        const newUser = await usersCollection.insertOne({
          firebaseId,
          email,
          registeredCourses: [],
          createdAt: new Date(),
        });

        return res.status(200).json({
          message: "User created successfully",
          userId: newUser.insertedId,
        });
      } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({ error: "Failed to create user in MongoDB" });
      }
    } else if (req.method === "GET") {
      // Handle fetching user data
      const { firebaseId } = req.query;

      if (!firebaseId) {
        return res.status(400).json({ error: "firebaseId query parameter is required" });
      }

      try {
        const user = await usersCollection.findOne({ firebaseId });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        return res.status(500).json({ error: "Failed to retrieve user data" });
      }
    } else {
      // Handle unsupported methods
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    return res.status(500).json({ error: "Database connection error" });
  }
}
