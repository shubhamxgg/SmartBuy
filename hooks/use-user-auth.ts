import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export function useUserAuth() {
  const user = useAuthStore((state) => state.user);

  const showLoginToast = () => {
    toast.error("Please log in to access this feature.", {
      description: "Authentication required",
      duration: 3000,
    });
  };

  return {
    user,
    userId: user?.id || null,
    isAuthenticated: !!user,
    showLoginToast,
  };
}