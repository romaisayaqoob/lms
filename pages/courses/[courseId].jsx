import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connectToDB } from "../lib/mongodb";
import { useAuth } from '../context/AuthContext'

export default function CoursePage({ course }) {
  const { user, authReady } = useAuth();
  const router=useRouter();

  // Add comprehensive logging
  useEffect(() => {
    console.log("Authentication State:", {
      user: user,
      authReady: authReady,
      userExists: !!user,
      userUid: user?.uid
    });
  }, [user, authReady]);
  const [selectedLecture, setSelectedLecture] = useState(course.modules[0]?.lectures[0] || null);

  const handleRegisterCourse = async () => {
    console.log("handleRegisterCourse - Current User:", {
      user: user,
      uid: user?.uid
    });
    if (!user) {
      alert("You must be logged in to register for a course.");
      router.push("/auth/login"); // Redirect to login if not logged in
      return;
    }

    try {
      console.log("lalalalalla")
      const response = await fetch("/api/register-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: course.id, firebaseId: user.uid }), // Send Firebase UID
      });

      if (response.ok) {
        alert("Course registered successfully!");
      } else {
        const error = await response.json();
        alert("Failed to register course: " + error.message);
      }
    } catch (err) {
      console.error("Error registering course:", err);
      alert("An error occurred while registering the course.");
    }
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
        <p className="text-lg text-gray-600 mt-2">{course.description}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-700">
            <span className="font-semibold">Instructor:</span> {course.instructor}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Duration:</span> {course.duration}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Price:</span> ${course.price}
          </p>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="max-w-7xl mx-auto mt-8 flex gap-6">
        {/* Lecture List */}
        <div className="w-1/3 bg-white p-4 shadow-md rounded-md h-[500px] overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lectures</h2>
          {course.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="mb-6">
              <h3 className="text-xl font-bold text-gray-700">{module.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{module.description}</p>
              <ul className="space-y-2">
                {module.lectures.map((lecture, lectureIndex) => (
                  <li
                    key={lectureIndex}
                    className={`cursor-pointer p-2 rounded-md ${
                      selectedLecture?.title === lecture.title
                        ? "bg-blue-500 text-white font-semibold"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedLecture(lecture)}
                  >
                    {lecture.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Lecture Details */}
        <div className="w-2/3 bg-white p-6 shadow-md rounded-md">
          {selectedLecture ? (
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                {selectedLecture.title}
              </h2>
              <p className="text-gray-600 mt-2">{selectedLecture.description}</p>
              <iframe
                className="mt-4 w-full h-[300px] border rounded-md"
                src={selectedLecture.videoUrl}
                title={selectedLecture.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>No lecture selected.</p>
          )}
        </div>
      </div>

      {/* Register Button */}
      <div className="max-w-7xl mx-auto mt-8">
        <button
          className="w-full bg-blue-600 text-white py-3 text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all"
          onClick={handleRegisterCourse}
        >
          Register Course
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { courseId } = params;

  try {
    console.log("Fetching course with ID:", courseId); // Debugging log
    const db = await connectToDB();  // Use the connectToDB function here
    const course = await db.collection("courses").findOne({ id: parseInt(courseId) });

    if (!course) {
      console.log("Course not found for ID:", courseId); // Debugging log
      return { notFound: true };
    }

    // Convert the _id field to a string before returning the course object
    const serializedCourse = {
      ...course,
      _id: course._id.toString(), // Serialize _id field to a string
    };

    return {
      props: { course: serializedCourse },
    };
  } catch (error) {
    console.error("Error fetching course:", error.message); // Debugging log
    return { notFound: true };
  }
}
