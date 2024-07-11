import { useAuthStore } from "@/store/useAuthStore";

export function useUserId() {
  const user = useAuthStore((state) => state.user);
  
  if (!user) {
    console.error("User is undefined");
    return null;
  }

  const userId = user.id;
  if (!userId) {
    console.error("User ID is undefined");
    return null;
  }

  return userId;
}