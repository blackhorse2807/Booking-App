"use client";
import Image from "next/image";
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiLoader } from "react-icons/fi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
      console.log("User created:", res.user);
      alert("Signup successful!");
      window.location.href = "/home";
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Signup failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-200 to-orange-500">
      <div className="w-full sm:w-3/4 md:w-2/5 lg:w-1/3 bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex justify-center">
          <Image src="/aks.png" width={80} height={80} alt="Logo" />
        </div>

        <h1 className="text-center text-2xl font-extrabold text-gray-800">Create Your Account</h1>

        <div className="space-y-4">
          <div className="relative">
            <FiUser className="absolute top-3 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full pl-12 p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute top-3 left-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full pl-12 p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3 left-4 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full pl-12 p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <button
            onClick={onSignup}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white text-lg shadow-md transition-all ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <FiLoader className="animate-spin mr-2" /> Creating...
              </div>
            ) : (
              "Sign Up with Email"
            )}
          </button>

          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-gray-400 text-sm">OR</span>
            </div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="w-full py-3 flex items-center justify-center border rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-all"
          >
            <Image src="/google.png" width={20} height={20} alt="Google Icon" className="mr-2" />
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
