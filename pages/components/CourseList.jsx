// components/CourseList.js
import React from "react";
import CourseCard from "./CourseCard";

const CourseList = ({ courses, isLoading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
      {isLoading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses available in this category.</p>
      ) : (
        courses.map((course) => <CourseCard key={course._id} course={course} />)
      )}
    </div>
  );
};

export default CourseList;
