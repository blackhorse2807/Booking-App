import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import "dotenv/config";
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/home"; // Redirect users to /home
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
