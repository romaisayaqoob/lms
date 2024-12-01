import { connectToDB } from "../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { courseId, firebaseId } = req.body; 
  console.log("Registering course with ID:", courseId);
  console.log("For user with Firebase ID:", firebaseId);
// Expecting `courseId` and `firebaseId` in the request body

  if (!courseId || !firebaseId) {
    return res.status(400).json({ message: "Missing courseId or firebaseId" });
  }

  try {
    const db = await connectToDB();
    const usersCollection = db.collection("users");

    // Find the user by their Firebase ID
    const user = await usersCollection.findOne({ firebaseId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course is already registered
    if (user.registeredCourses && user.registeredCourses.includes(courseId)) {
      return res.status(409).json({ message: "Course already registered" });
    }

    // Add the course to the registeredCourses array
    await usersCollection.updateOne(
      { firebaseId },
      { $push: { registeredCourses: courseId } }
    );

    return res.status(200).json({ message: "Course registered successfully" });
  } catch (error) {
    console.error("Error registering course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
