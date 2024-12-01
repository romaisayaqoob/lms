import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import Layout from "../components/Layout";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category) {
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/filter-courses?category=${category}`);
        const data = await response.json();

        if (response.ok) {
          setCourses(data.courses);
        } else {
          setError(data.message || "An error occurred");
        }
      } catch (error) {
        setError("Failed to fetch courses: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {category === "all" ? "All Courses" : `${category} Courses`}
      </h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p>No courses found in this category.</p>
      )}
    </div>
    </Layout>
  );
};

export default CategoryPage;
