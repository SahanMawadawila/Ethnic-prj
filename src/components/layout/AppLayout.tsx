"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  fullScreen?: boolean;
}

export function AppLayout({ children, fullScreen = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main
        className={fullScreen ? "flex-1" : "container mx-auto flex-1 px-4 py-8"}
      >
        {children}
      </main>
    </div>
  );
}
