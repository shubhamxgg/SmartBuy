"use client";
import { ThemeProvider } from "@/components/theme";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthModal from "@/components/modal/auth-modal";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthModal />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" closeButton richColors expand />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
};

export default Provider;
