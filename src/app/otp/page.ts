"use client";
import { useState } from "react";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // 4 OTP fields
  const [error, setError] = useState("");

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Limit input to 1 digit
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length < 4) {
      setError("Please enter the complete OTP");
    } else {
      setError("");
      console.log("Entered OTP:", otp.join(""));
      // Call OTP verification API here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Verify OTP</h1>

      {/* OTP Input Fields */}
      <div className="flex justify-center gap-4 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        className="w-full max-w-xs py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition"
      >
        Verify
      </button>

      {/* Resend OTP */}
      <p className="mt-4 text-sm text-gray-600">
        <span>Resend OTP?</span>
      </p>

      {/* Change Phone Number */}
      <a href="#" className="mt-4 text-blue-600 font-semibold">
        Change Phone Number
      </a>
    </div>
  );
};

export default OTPVerification;
