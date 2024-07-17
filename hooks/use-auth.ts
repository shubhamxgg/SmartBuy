import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useCallback } from "react";

export function useUserAuth() {
  const user = useAuthStore((state) => state.user);

  const showLoginToast = useCallback(() => {
    console.log("Attempting to show login toast");
    toast.error("Please log in to access this feature.", {
      duration: 5000,
    });
    console.log("Toast function called");
  }, []);

  return {
    user,
    userId: user?.id || null,
    isAuthenticated: !!user,
    showLoginToast,
  };
}