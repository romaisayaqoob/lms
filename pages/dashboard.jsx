import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext"; // Import authentication context
import Layout from "./components/Layout";
import CourseCard from "./components/CourseCard"; // Import CourseCard component

const Dashboard = () => {
  const { user, authReady } = useAuth(); // Get user and authReady from context
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!authReady) return; // Wait for authentication to be ready
  
      if (!user) {
        setError("You need to be logged in to view registered courses.");
        return;
      }
  
      try {
        const response = await fetch(
          `/api/get-registered-courses?firebaseId=${user.uid}` // Send Firebase ID in query string
        );
  
        const data = await response.json();
  
        if (response.ok) {
          setCourses(data.courses);
        } else {
          setError(data.message || "An error occurred");
        }
      } catch (error) {
        setError("Failed to fetch courses: " + error.message);
      }
    };
  
    fetchCourses();
  }, [user, authReady]); // Re-run when user or authReady changes
  

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">My Registered Courses</h1>

        {/* Error Handling */}
        {error && <p className="text-red-500">{error}</p>}

        {courses? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p>You have not registered for any courses yet.</p>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
