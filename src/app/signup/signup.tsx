"use client";
import Image from "next/image";
import { useState } from "react";
import { FiUser, FiPhone, FiMail, FiLoader } from "react-icons/fi";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [User, setUser] = useState({
    Name: "",
    Phone: "",
    Email: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // For 6-digit OTP

  // Function to send OTP
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/sendOtp", {
        method: "POST",
        body: JSON.stringify({ phone: User.Phone }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent successfully!");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    const enteredOtp = otp.join(""); // Combine digits into a single string
    try {
      setLoading(true);
      const response = await fetch("/api/verifyOtp", {
        method: "POST",
        body: JSON.stringify({ otp: enteredOtp }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("OTP Verified Successfully!");
        window.location.href = "/home"; // Redirect to home page
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-200 to-orange-500">
      <div className="w-full sm:w-3/4 md:w-2/5 lg:w-1/3 bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/aks.png" width={80} height={80} alt="Logo" />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-extrabold text-gray-800">
          {otpSent ? "Verify OTP" : "Create Your Account"}
        </h1>

        {/* Form Fields */}
        <div className="space-y-4">
          {!otpSent ? (
            <>
              {/* Name Field */}
              <div className="relative">
                <FiUser className="absolute top-3 left-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={User.Name}
                  onChange={(e) => setUser({ ...User, Name: e.target.value })}
                  className="w-full pl-12 p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <FiPhone className="absolute top-3 left-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={User.Phone}
                  onChange={(e) => setUser({ ...User, Phone: e.target.value })}
                  className="w-full pl-12 p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <FiMail className="absolute top-3 left-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={User.Email}
                  onChange={(e) => setUser({ ...User, Email: e.target.value })}
                  className="w-full pl-12 p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* Sign Up Button */}
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
                    <FiLoader className="animate-spin mr-2" /> Sending OTP...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </>
          ) : (
            <>
              {/* OTP Input Fields */}
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value.slice(-1);
                      setOtp(newOtp);

                      if (e.target.value && index < otp.length - 1) {
                        document.getElementById(`otp-${index + 1}`).focus();
                      }
                    }}
                    id={`otp-${index}`}
                    className="w-10 h-10 text-center border rounded-md text-xl focus:ring-2 focus:ring-orange-500"
                  />
                ))}
              </div>

              {/* Verify OTP Button */}
              <button
                onClick={verifyOtp}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-bold text-white text-lg shadow-md transition-all ${
                  loading
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <FiLoader className="animate-spin mr-2" /> Verifying...
                  </div>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </>
          )}
        </div>

        {/* Signup with Google */}
        {!otpSent && (
          <>
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
              <Image
                src="/google.png"
                width={20}
                height={20}
                alt="Google Icon"
                className="mr-2"
              />
              Sign Up with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
