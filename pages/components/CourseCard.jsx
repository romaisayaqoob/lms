// components/CourseCard.js
import React from "react";
import Link from "next/link";

const CourseCard = ({ course }) => {
  return (
    <Link href={`/courses/${course.id}`} passHref>
      <div className="border p-4 rounded-md shadow hover:shadow-lg transition-shadow cursor-pointer">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-semibold">{course.title}</h2>
        <p className="text-sm text-gray-600">{course.instructor}</p>
        <p className="text-sm text-gray-500 mt-1">{course.category}</p>
        <p className="text-sm text-gray-800 mt-1">Price: ${course.price}</p>
        <p className="text-sm text-gray-600 mt-2">{course.description}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
