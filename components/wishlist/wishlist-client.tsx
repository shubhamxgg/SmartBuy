"use client";
import { useEffect } from "react";
import WishlistList from "@/components/wishlist/wishlist-list";
import { useUserAuth } from "@/hooks/use-auth";
import useAuthModalStore from "@/store/useAuthModalStore";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";

const WishlistPage = () => {
  const { isAuthenticated, userId } = useUserAuth();
  const { openModal } = useAuthModalStore();

  useEffect(() => {
    if (!isAuthenticated) {
      openModal();
    }
  }, [isAuthenticated, openModal]);

  // if (isAuthenticated) {
  //   return <LoadingState />;
  // }

  if (!isAuthenticated) {
    return <UnauthenticatedState />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      <WishlistList />
    </div>
  );
};

// const LoadingState = () => (
//   <div className="flex items-center justify-center min-h-[50vh]">
//     <Loader2 className="h-8 w-8 animate-spin text-primary" />
//   </div>
// );

const UnauthenticatedState = () => (
  <div className="container mx-auto px-4 py-8 text-center">
    <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
    <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
    <p className="mb-4">Please log in to view your wishlist.</p>
    <Button onClick={useAuthModalStore.getState().openModal}>Log In</Button>
  </div>
);

export default WishlistPage;
