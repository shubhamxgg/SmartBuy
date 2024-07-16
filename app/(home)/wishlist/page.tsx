"use client";
import { useEffect } from "react";
import WishlistList from "@/components/wishlist/wishlist-list";
import { useUserAuth } from "@/hooks/use-auth";
import useAuthModalStore from "@/store/useAuthModalStore";

const WishlistPage = () => {
  const { isAuthenticated, userId } = useUserAuth();
  const { openModal } = useAuthModalStore();

  useEffect(() => {
    if (!isAuthenticated) {
      openModal();
    }
  }, [isAuthenticated, openModal]);

  if (!isAuthenticated) {
    return <UnauthenticatedState />;
  }

  return (
    <div>
      <WishlistList userId={userId as number} />
    </div>
  );
};

const UnauthenticatedState = () => (
  <div className="text-center py-10">
    <p>Please log in to view your wishlist.</p>
  </div>
);

export default WishlistPage;
