// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//        role: "ADMIN" | "AUTHOR";
//     };
//   }
// }


// import { DefaultSession } from "next-auth";
// import { JWT as DefaultJWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: "ADMIN" | "AUTHOR";
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     role?: "ADMIN" | "AUTHOR";
//   }
// }


import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "AUTHOR";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: "ADMIN" | "AUTHOR";
  }
}
