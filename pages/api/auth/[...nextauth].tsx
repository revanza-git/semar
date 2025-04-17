import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const formatUsername = (username: string) => {
  return username.startsWith("mk.") ? username.substring(3) : username;
};

const fetchUser = async (
  username: string
): Promise<{ id: string; name: string; email: string; department: string }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/User/${username}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: any = await response.json();

  if (
    typeof data.id === "string" &&
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    typeof data.department === "string"
  ) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      department: data.department,
    };
  } else {
    throw new Error("Invalid response format");
  }
};

const fetchUserRole = async (username: string): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/User/Role/${username}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.text();
};

const fetchDepartmentById = async (
  departmentId: string
): Promise<{ deskripsi: string }> => {
  try {
    console.log(`Fetching department with ID: ${departmentId}`);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/Common/department/${departmentId}`
    );

    console.log(`Response status: ${response.status}`);
    if (!response.ok) {
      console.error(`Network response was not ok: ${response.statusText}`);
      throw new Error("Network response was not ok");
    }

    const data: any = await response.json();
    console.log(`Response data:`, data);

    if (typeof data.deskripsi === "string") {
      return { deskripsi: data.deskripsi };
    } else {
      console.error("Invalid response format", data);
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching department:", error);
    throw error;
  }
};

const authenticateUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/User/ADAuth?userName=${credentials.username}&password=${credentials.password}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json(); // or res.text() if the response is plain text
};

type RequestInternal = {
  body?: Record<string, any>;
  query?: Record<string, any>; // Make query optional
  headers?: HeadersInit;
  method?: string;
};

const authorizeUser = async (
  credentials: { username: string; password: string } | undefined,
  req: Pick<RequestInternal, "body" | "headers" | "method" | "query">
): Promise<{
  id: any;
  name: any;
  email: any;
  role: string;
  department: string;
  deskripsi: string;
} | null> => {
  if (!credentials) {
    return null;
  }

  // Check for hardcoded credentials
  if (credentials.username === "admin" && credentials.password === "admin123") {
    return {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "AdminQM",
      department: "232",
      deskripsi: "QM",
    };
  }

  // Check for hardcoded credentials
  if (credentials.username === "user" && credentials.password === "user123") {
    return {
      id: "2",
      name: "User",
      email: "user@example.com",
      role: "User",
      department: "321",
      deskripsi: "SDM",
    };
  }

  try {
    const isAuthenticated = await authenticateUser(credentials);
    const usernameFormatted = formatUsername(credentials.username);
    const user = await fetchUser(usernameFormatted);
    const role = await fetchUserRole(usernameFormatted);
    const department = await fetchDepartmentById(user.department);

    return isAuthenticated && user
      ? {
          ...user,
          role,
          department: user.department,
          deskripsi: department.deskripsi,
        }
      : null;
  } catch (error) {
    return null;
  }
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: authorizeUser,
    }),
  ],
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_BASEPATH || "/portal/semar"}/login`,
  },
  callbacks: {
    async session({ session, token }) {
      session.userId = (token.id as string) ?? ""; // Ensure token.id is a string
      session.name = (token.name as string) ?? ""; // Ensure token.name is a string
      session.role = (token.role as string) ?? ""; // Ensure token.role is a string
      session.department = token.department ?? ""; // Ensure token.department is included
      session.deskripsi = token.deskripsi ?? ""; // Ensure token.deskripsi is included
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.department = user.department;
        token.deskripsi = user.deskripsi;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const basePath = process.env.NEXT_PUBLIC_BASEPATH || "/portal/semar";
      // Only allow redirects within the app's base path
      if (url.startsWith(basePath)) return url;
      // If url is a relative path, prefix with basePath
      if (url.startsWith("/")) return basePath + url;
      // Default: always redirect to basePath
      return basePath;
    },
  },
});
