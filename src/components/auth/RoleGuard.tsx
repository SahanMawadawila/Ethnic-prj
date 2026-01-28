"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ("SELLER" | "COLLECTOR" | "ADMIN")[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // 1. Not logged in? -> Login
      if (!user) {
        router.push("/login");
        return;
      }

      // 2. Logged in but wrong role? -> Redirect to THEIR dashboard
      if (profile && !allowedRoles.includes(profile.role)) {
        if (profile.role === "SELLER") router.push("/seller/dashboard");
        else if (profile.role === "COLLECTOR")
          router.push("/collector/dashboard");
      }
    }
  }, [user, profile, isLoading, router, allowedRoles]);

  if (isLoading || !profile) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // If checks pass, show the page
  return <>{children}</>;
}
