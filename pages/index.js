import React from "react";
import Layout from "./components/Layout";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  const handleBrowseCourses = () => {
    router.push("/browse"); // Redirect to the browse page
  };

  return (
    <Layout>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        {/* <h1 className="text-4xl font-bold mb-4">
          Welcome to Learning Management System
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          Empowering you to explore and register for courses seamlessly. Start your journey with us today!
        </p> */}
        <img
          src="/images.png" // Replace with your image file in the public folder
          alt="Learning Illustration"
          className="rounded-lg shadow-lg mb-6 w-full"
        />
        {/* Browse Courses Button */}
        <button
          onClick={handleBrowseCourses}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Browse Courses
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default Home;
