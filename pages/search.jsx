import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CourseCard from "./components/CourseCard";
import Layout from "./components/Layout";

const Search = () => {
  const router = useRouter();
  const { q } = router.query; // Get the search query from the URL

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!q) {
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/search-courses?q=${q}`);
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
  }, [q]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p>No courses found for your search query.</p>
      )}
    </div>
    </Layout>
  );
};

export default Search;
