import { useAuthStore } from "@/store/useAuthStore";

export function useUserId() {
  const { user } = useAuthStore();
  return user ? user.id : null;
}
