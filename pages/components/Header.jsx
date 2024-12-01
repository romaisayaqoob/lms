// components/Header.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase"; // Import the initialized auth instance
import SearchBar from "./SearchBar";

const Header = () => {
  const [user, setUser] = useState(null); // State to store the authenticated user
  const router = useRouter();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  // Handle Login button click
  const handleLogin = () => {
    router.push("/auth/login"); // Redirect to login page
  };

  // Handle Logout button click
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/auth/login"); // Redirect to signup page
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="ml-64 p-6 border-b flex items-center justify-between">
      <SearchBar />
      <div className="flex items-center gap-4">
        {user ? (
          // Show Logout button if user is signed in
          <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          // Show Login button if user is not signed in
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
           onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
