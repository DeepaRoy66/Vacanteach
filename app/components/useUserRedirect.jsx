// app/useUserRedirect.js
"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useUserRedirect() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function checkRedirect() {
      if (status !== "authenticated") {
        console.log("useUserRedirect: Not authenticated, skipping redirect");
        return;
      }

      const currentPath = window.location.pathname;
      console.log("useUserRedirect: Current pathname:", currentPath, "Session:", {
        role: session?.user?.role,
        profileCompleted: session?.user?.profileCompleted,
      });

      // Trust session data if available
      if (session?.user?.role && session?.user?.profileCompleted && session.user.role !== "user") {
        const redirectPath = session.user.role === "organization" ? "/organization" : "/teacher";
        if (currentPath !== redirectPath) {
          console.log("useUserRedirect: Redirecting to", redirectPath);
          router.replace(redirectPath);
        }
        return;
      }

      // Fallback to API check
      try {
        const res = await fetch("/api/user/check-role");
        if (!res.ok) {
          console.error("useUserRedirect: API error", { status: res.status, text: await res.text() });
          if (currentPath !== "/select-role" && currentPath !== "/auth") {
            console.log("useUserRedirect: Redirecting to /select-role due to API error");
            router.replace("/select-role");
          }
          return;
        }
        const { role, profileCompleted } = await res.json();
        console.log("useUserRedirect: API response", { role, profileCompleted });
        if (role && profileCompleted && role !== "user") {
          const redirectPath = role === "organization" ? "/organization" : "/teacher";
          if (currentPath !== redirectPath) {
            console.log("useUserRedirect: Redirecting to", redirectPath);
            router.replace(redirectPath);
          }
        } else if (currentPath !== "/select-role" && currentPath !== "/auth") {
          console.log("useUserRedirect: Redirecting to /select-role");
          router.replace("/select-role");
        }
      } catch (error) {
        console.error("useUserRedirect: Error checking role", error);
        if (currentPath !== "/select-role" && currentPath !== "/auth") {
          console.log("useUserRedirect: Redirecting to /select-role due to error");
          router.replace("/select-role");
        }
      }
    }
    checkRedirect();
  }, [status, session, router]);
}