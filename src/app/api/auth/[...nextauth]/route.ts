import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    // Google Provider (already implemented)
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    // Credentials Provider for OTP Login
    CredentialsProvider({
      name: "OTP Login",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const { phone, otp } = credentials;

        // Call your backend to verify OTP
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/verifyOtp`, {
          method: "POST",
          body: JSON.stringify({ phone, otp }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          // On successful OTP verification, return user object
          return { id: phone, name: `User ${phone}`, phone };
        } else {
          throw new Error("Invalid OTP");
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/home"; // Redirect to /home after login
    },
    async jwt({ token, user }) {
      if (user) {
        token.phone = user.phone || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.phone) {
        session.user.phone = token.phone;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
