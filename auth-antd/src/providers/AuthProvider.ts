import { AuthProvider } from "@refinedev/core";

const API_URL = "http://localhost:3000";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      const { accessToken } = data;

      const payload = JSON.parse(atob(accessToken.split('.')[1]));

      if (!payload.isAdmin) {
        return {
          success: false,
          error: {
            message: "Unauthorized",
            name: "You are not an admin",
          },
        };
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(payload));

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Login error",
          name: (error as Error).message,
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
        error: {
          message: "Not authenticated",
          name: "No token",
        },
      };
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (!payload.isAdmin) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
        error: {
          message: "Not authorized",
          name: "Admin only",
        },
      };
    }

    return {
      authenticated: true,
    };
  },

  onError: async (error) => {
    if (error.status === 401) {
      return {
        logout: true,
        redirectTo: "/login",
      };
    }
    return { error };
  },

  register: async () => ({ success: false }),
  updatePassword: async () => ({ success: false }),
  forgotPassword: async () => ({ success: false }),
};
