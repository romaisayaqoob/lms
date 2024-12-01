// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors

        try {
            const user = await login(email, password);
            console.log("User logged in: ", user);
            router.push("/"); // Redirect after login
        } catch (error) {
            console.error("Error logging in: ", error.message);
            
            // Set user-friendly error messages
            switch (error.code) {
                case 'auth/invalid-email':
                    setError("Invalid email address.");
                    break;
                case 'auth/user-disabled':
                    setError("This user account has been disabled.");
                    break;
                case 'auth/user-not-found':
                    setError("No user found with this email.");
                    break;
                case 'auth/wrong-password':
                    setError("Incorrect password.");
                    break;
                default:
                    setError("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <form onSubmit={handleLogin} className="w-80 p-6 bg-white rounded-lg shadow-md">
                {error && (
                    <div className="mb-4 text-red-600 text-center">
                        {error}
                    </div>
                )}
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
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
                    className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
}