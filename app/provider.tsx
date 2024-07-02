"use client";
import { ThemeProvider } from "@/components/theme";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";
const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ClerkProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="bottom-right" closeButton richColors expand  />
          </ThemeProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </div>
  );
};

export default Provider;
