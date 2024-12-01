// components/CategoryFilter.js
import React, { useState } from "react";
import { useRouter } from "next/router";

const CategoryFilter = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const filterOptions = [
    { id: 1, name: "All", value: "all" },
    { id: 2, name: "React Js", value: "reactjs" },
    { id: 3, name: "Next Js", value: "nextjs" },
    { id: 4, name: "Tailwind CSS", value: "tailwindcss" },
    { id: 5, name: "Firebase", value: "firebase" },
  ];

  const handleFilterClick = (index, value) => {
    setActiveIndex(index);
    router.push(`/categories/${value}`);
  };

  return (
    <div className="flex gap-5">
      {filterOptions.map((item, index) => (
        <button
          key={index}
          onClick={() => handleFilterClick(index, item.value)}
          className={`border p-2 px-4 text-sm rounded-md hover:border-purple-800 font-semibold hover:bg-gray-50 ${
            activeIndex === index ? "border-purple-800 bg-purple-50 text-purple-800" : ""
          }`}
        >
          <h2>{item.name}</h2>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
