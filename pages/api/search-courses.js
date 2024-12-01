import { connectToDB } from "../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { q } = req.query;

  if (!q || q.trim() === "") {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const db = await connectToDB();
    const coursesCollection = db.collection("courses");

    // Perform a case-insensitive search for courses matching the query
    const courses = await coursesCollection
      .find({
        title: { $regex: q.trim(), $options: "i" },
      })
      .toArray();

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
