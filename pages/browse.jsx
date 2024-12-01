import React, { useState, useEffect } from "react";
import CategoryFilter from "./components/CategoryFilter";
import CourseList from "./components/CourseList";
import Layout from "./components/Layout"; 

const Browse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/courses?category=${selectedCategory}`);
        console.log("Response:", res);

        if (!res.ok) {
          throw Error("Failed to fetch data");
        }

        const text = await res.text();
        console.log("Raw response text:", text);

        const data = JSON.parse(text);
        console.log("Parsed Data:", data);

        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error("Received data is not an array");
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [selectedCategory]);

  return (
    <Layout>
      {/* Inside the layout */}
      <CategoryFilter onSelectCategory={setSelectedCategory} />
      <CourseList courses={courses} isLoading={isLoading} />
    </Layout>
  );
};

export default Browse;
