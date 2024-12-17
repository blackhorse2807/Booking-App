import { NextRequest, NextResponse } from "next/server";

let otpStore: { [key: string]: { otp: string; expiresAt: number } } = {}; // Shared OTP store

export async function POST(req: NextRequest) {
  const { phone, otp } = await req.json();

  try {
    const storedOtpDetails = otpStore[phone];

    // Validate OTP
    if (!storedOtpDetails) {
      return NextResponse.json({ error: "No OTP found for this number" }, { status: 400 });
    }

    if (storedOtpDetails.expiresAt < Date.now()) {
      delete otpStore[phone]; // Remove expired OTP
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    if (storedOtpDetails.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // OTP Verified - Remove from memory
    delete otpStore[phone];
    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error verifying OTP:", error.message);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}
