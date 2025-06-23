import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import "dotenv/config";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: "615855067853-o2munji5dar7d1osjtev3fc0mfolmgpq.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Prioritize callbackUrl
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/home`; // Default to /home
    },
  },
  
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
