// src/providers/auth-provider.ts
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return { success: false, error: { message: "Login failed" } };
    }

    const data = await response.json();

    if (data.accessToken) {
      localStorage.setItem("my_access_token", data.accessToken);
      return { success: true };
    }

    return { success: false };
  },

  logout: async () => {
    localStorage.removeItem("my_access_token");
    return { success: true };
  },

  check: async () => {
    const token = localStorage.getItem("my_access_token");
    return {
      authenticated: !!token,
      redirectTo: !token ? "/login" : undefined,
    };
  },

  getIdentity: async () => {
    const token = localStorage.getItem("my_access_token");

    if (!token) return null;

    const response = await fetch("http://localhost:3000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },

  onError: async (error) => {
    console.error("Auth error:", error);
    return {};
  },
};
