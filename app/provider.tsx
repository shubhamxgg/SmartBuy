import { ThemeProvider } from "@/components/theme";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { CreativeCommonsIcon } from "lucide-react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-right" closeButton richColors />
      </ThemeProvider>
    </div>
  );
};

export default Provider;
