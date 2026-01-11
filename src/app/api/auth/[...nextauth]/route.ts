
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/db";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),

//   session: {
//     // strategy: "database", // یا "jwt"
//     strategy: "jwt", // یا "jwt"
//   },

//   providers: [
// CredentialsProvider({
//   name: "Credentials",
//   credentials: {
//     email: { label: "Email", type: "email" },
//     password: { label: "Password", type: "password" },
//   },
//   async authorize(credentials) {
//     if (!credentials?.email || !credentials?.password) return null;

//     const user = await prisma.user.findUnique({
//       where: { email: credentials.email },
//     });

//     if (!user || !user.password) return null;

//     const isValid = await bcrypt.compare(
//       credentials.password,
//       user.password
//     );
//     if (!isValid) return null;

//     // 👇 role حتماً برگردان
//     return {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     };
//   },
// }),


//     GoogleProvider({
//   clientId: process.env.GOOGLE_ID!,
//   clientSecret: process.env.GOOGLE_SECRET!,

// }),

//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
//   callbacks: {
//   async session({ session, token }) {
//     if (session.user) {
//       session.user.id = token.sub!;
//       session.user.role = token.role;
//     }
//     return session;
//   },

//   async jwt({ token, user }) {
//     if (user) {
//       token.role = user.role;
//     }
//     return token;
//   },
// }



// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/db";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),

//   session: {
//     strategy: "jwt", // یا "database" اگر دوست داری
//   },

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.password) return null;

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) return null;

//         // 👇 حتماً role برگردان
//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role, 
//         };
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//     }),

//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.role = user.role;
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub!;
//         session.user.role = token.role!;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/db";
// import bcrypt from "bcryptjs";
// import type { NextAuthOptions } from "next-auth";
// import type { JWT } from "next-auth/jwt";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),

//   session: {
//     strategy: "jwt", // یا "database"
//   },

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.password) return null;

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) return null;

//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role, // حتما role برگردان
//         };
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//     }),

//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: any }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },

//     async session({ session, token }: { session: any; token: JWT }) {
//       if (session.user) {
//         session.user.id = token.sub!;
//         session.user.role = token.role!;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
// import NextAuth from "next-auth";

// import { authOptions } from "@/lib/auth-options";

import { authOptions } from "@/lib/auth-options";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
