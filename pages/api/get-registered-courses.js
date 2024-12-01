import { connectToDB } from "../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firebaseId } = req.query;

  if (!firebaseId) {
    return res.status(400).json({ message: "Firebase ID is required" });
  }

  try {
    const db = await connectToDB();
    const usersCollection = db.collection("users");
    const coursesCollection = db.collection("courses");

    // Find the user by their Firebase ID
    const user = await usersCollection.findOne({ firebaseId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the registered course IDs
    const registeredCourseIds = user.registeredCourses || [];

    if (registeredCourseIds.length === 0) {
      return res.status(200).json({ message: "No registered courses found" });
    }

    // Find the details of the registered courses by their IDs
    const courses = await coursesCollection
      .find({ id: { $in: registeredCourseIds } })  // Match registered course IDs
      .toArray();

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found for the registered IDs" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching registered courses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
