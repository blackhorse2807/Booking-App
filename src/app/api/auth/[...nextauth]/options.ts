import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username:", type: "text", placeholder: "your-cool-username" },
        password: { label: "Password:", type: "password", placeholder: "your-awesome-password" },
      },
      async authorize(credentials) {
        // Replace this logic with your database or API call
        const user = { id: "42", name: "Dave", password: "nextauth" };

        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user; // Login successful
        } else {
          return null; // Login failed
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom sign-in page (optional)
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Attach user id to session
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id; // Add user id to JWT
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/home"; // Redirect to /home after sign-in
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Required for JWT encryption
  debug: process.env.NODE_ENV === "development", // Debug logs in development
};
