import { connectToDB } from "../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  try {
    const db = await connectToDB();
    const coursesCollection = db.collection("courses");

    // Fetch courses based on the category or all courses if category is "all"
    const query =
      category === "all" ? {} : { category: { $regex: new RegExp(category, "i") } };
    const courses = await coursesCollection.find(query).toArray();

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found in this category" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
