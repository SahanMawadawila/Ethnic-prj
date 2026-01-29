"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // 1. Not Logged In
      if (!user) {
        router.replace(`/login?from=${encodeURIComponent(pathname)}`);
        return;
      }

      // 2. Role Mismatch
      if (requiredRole && profile?.role !== requiredRole) {
        const redirectPath =
          profile?.role === "COLLECTOR"
            ? "/collector/dashboard"
            : "/seller/dashboard";
        router.replace(redirectPath);
        return;
      }

      // 3. Collector Incomplete Profile
      if (
        profile?.role === "COLLECTOR" &&
        !profile.vehicleType &&
        pathname !== "/onboarding"
      ) {
        router.replace("/onboarding");
      }
    }
  }, [user, profile, loading, router, pathname, requiredRole]);

  if (loading || !user || (requiredRole && profile?.role !== requiredRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
