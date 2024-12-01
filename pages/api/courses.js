// pages/api/courses.js
import { connectToDB } from '../lib/mongodb'; // Use relative path

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDB();

      // Check if db connection was successful
      if (!db) {
        throw new Error("Database connection was not established.");
      }

      // Access the 'courses' collection
      const coursesCollection = db.collection('courses');

      // Fetch all courses
      let courses = [];
      try {
        courses = await coursesCollection.find({}).toArray();
        // Check if the result is an array
        if (!Array.isArray(courses)) {
          throw new Error("Fetched data is not an array.");
        }
      } catch (err) {
        // Catch any issues during the find operation
        console.error("Error fetching courses from the database:", err.message);
        throw new Error("Failed to fetch courses.");
      }

      // Return the courses as a JSON response
      return res.status(200).json(courses);
    } catch (error) {
      // Log the error for debugging
      console.error("Error in GET request:", error.message);

      // Return a response with error details
      return res.status(500).json({
        error: 'Failed to fetch courses. ' + error.message,
      });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
