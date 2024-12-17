import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import "dotenv/config";

const client = twilio(process.env.TWILIO_ACCOUNT_SID as string, process.env.TWILIO_AUTH_TOKEN as string);

const otpStore: { [key: string]: { otp: string; expiresAt: number } } = {}; // Temporary OTP store

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  // Generate a 6-digit OTP
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

  try {
    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP is: ${generatedOtp}. It is valid for 5 minutes.`,
      from: process.env.PHONE_NO as string,
      to: phone, // Recipient phone number
    });

    // Store OTP in memory
    otpStore[phone] = { otp: generatedOtp, expiresAt };

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
  } catch (error) {
    // Explicitly cast error to type Error
    const err = error as Error;
    console.error("Twilio Error:", err.message);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
