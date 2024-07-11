import { create } from "zustand";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../lib/actions/user-auth";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const result = await loginUser({ email, password });
      if (result.success) {
        set({ user: result.user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
        throw new Error(result.message);
      }
    } catch (error) {
      set({ isLoading: false });
      throw new Error("Login failed");
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await logoutUser();
      if (result.success) {
        set({ user: null, isAuthenticated: false, isLoading: false });
      } else {
        set({ isLoading: false });
        throw new Error(result.message);
      }
    } catch (error) {
      set({ isLoading: false });
      throw new Error("Logout failed");
    }
  },
  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await refreshAccessToken();
      if (result.success) {
        set({ isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
  setUser: (user: User) => set({ user, isAuthenticated: true }),
}));
