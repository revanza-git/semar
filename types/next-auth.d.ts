import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    userId: string;
    name: string;
    role: string;
    department: string;
    deskripsi: string;
  }

  interface User {
    id: string;
    name: string;
    role: string;
    department: string;
    deskripsi: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    role: string;
    department: string;
    deskripsi: string;
  }
}
