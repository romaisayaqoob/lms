import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import axios from "axios";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Track loading state
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when request starts
        try {
            // Sign up with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create the user in the database
            await axios.post("/api/users", {
                firebaseId: user.uid,
                email: user.email,
                role: "user", // Default role
            });

            // Redirect to the user's profile page
            const firebaseId = user.uid;
            router.push(`/browse`);
        } catch (error) {
            console.error("Error signing up: ", error.message);
        } finally {
            setLoading(false); // Set loading to false once request is completed
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
            <form onSubmit={handleSignup} className="w-80 p-6 bg-white rounded-lg shadow-md">
                <label htmlFor="email" className="block mt-4 mb-2 font-medium">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
                <label htmlFor="password" className="block mt-4 mb-2 font-medium">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
                <button 
                    type="submit" 
                    className="w-full py-2 mt-4 bg-blue-500 text-white rounded"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? "Signing Up..." : "Sign Up"} {/* Show loading text when submitting */}
                </button>
            </form>
        </div>
    );
}
