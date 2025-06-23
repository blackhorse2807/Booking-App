import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import "dotenv/config";

// Extend the User type to include id
declare module "next-auth" {
  interface User {
    id?: string;
  }
}

// Extend the Session type
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

// For debugging purposes
const logWithTimestamp = (message: string, data?: unknown) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, data ? data : '');
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          
          const user = userCredential.user;
          
          if (user) {
            logWithTimestamp("User authenticated with Firebase:", user.email);
            return {
              id: user.uid,
              name: user.displayName || user.email?.split('@')[0] || "User",
              email: user.email,
              image: user.photoURL
            };
          }
          
          throw new Error("Invalid credentials");
        } catch (error: unknown) {
          console.error("Firebase authentication error:", error);
          if (error instanceof Error) {
            throw new Error(error.message || "Authentication failed");
          }
          throw new Error("Authentication failed");
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      logWithTimestamp("Sign in callback:", { user: user.email, provider: account?.provider });
      return true;
    },
    async jwt({ token, user, account }) {
      logWithTimestamp("JWT callback:", { token: token.email, newUser: !!user });
      
      // Initial sign in
      if (user && account) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.image,
        };
      }
      
      return token;
    },
    async session({ session, token }) {
      logWithTimestamp("Session callback:", { session: session.user?.email, token: token.email });
      
      if (session.user && token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture as string;
      }
      
      return session;
    },
    async redirect({ url, baseUrl }) {
      logWithTimestamp("Redirect callback:", { url, baseUrl });
      
      // If the URL is relative, prepend the base URL
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } 
      // If the URL is absolute but on the same origin, allow it
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Otherwise, redirect to the base URL
      return `${baseUrl}/home`;
    }
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-key",
  logger: {
    error(code, metadata) {
      logWithTimestamp(`NextAuth error: ${code}`, metadata);
    },
    warn(code) {
      logWithTimestamp(`NextAuth warning: ${code}`);
    },
    debug(code, metadata) {
      logWithTimestamp(`NextAuth debug: ${code}`, metadata);
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
