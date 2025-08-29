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

      // If session has role and profile completed, redirect accordingly
      if (session?.user?.role && session?.user?.profileCompleted && session.user.role !== "user") {
        if (session.user.role === "organization") {
          try {
            // Fetch org ID from API
            const res = await fetch("/api/user/organizationdata");
            if (res.ok) {
              const orgData = await res.json();
              const orgId = orgData.id;
              const redirectPath = `/organization/${orgId}`;
              if (currentPath !== redirectPath) {
                console.log("useUserRedirect: Redirecting to organization with id", orgId);
                router.replace(redirectPath);
              }
              return;
            } else {
              console.error("useUserRedirect: Failed to fetch org data", res.status);
            }
          } catch (err) {
            console.error("useUserRedirect: Error fetching org data", err);
          }
        } else if (session.user.role === "teacher") {
          const redirectPath = "/teacher";
          if (currentPath !== redirectPath) {
            router.replace(redirectPath);
          }
          return;
        }
      }

      // Fallback to API check if session data is missing
      try {
        const res = await fetch("/api/user/check-role");
        if (!res.ok) {
          if (currentPath !== "/select-role" && currentPath !== "/auth") {
            router.replace("/select-role");
          }
          return;
        }

        const { role, profileCompleted } = await res.json();
        console.log("useUserRedirect: API response", { role, profileCompleted });

        if (role && profileCompleted && role !== "user") {
          if (role === "organization") {
            const orgRes = await fetch("/api/organizationdata");
            if (orgRes.ok) {
              const orgData = await orgRes.json();
              const orgId = orgData.id;
              const redirectPath = `/organization/${orgId}`;
              if (currentPath !== redirectPath) {
                router.replace(redirectPath);
              }
              return;
            }
          } else if (role === "teacher") {
            const redirectPath = "/teacher";
            if (currentPath !== redirectPath) {
              router.replace(redirectPath);
            }
          }
        } else if (currentPath !== "/select-role" && currentPath !== "/auth") {
          router.replace("/select-role");
        }
      } catch (error) {
        console.error("useUserRedirect: Error during API check", error);
        if (currentPath !== "/select-role" && currentPath !== "/auth") {
          router.replace("/select-role");
        }
      }
    }

    checkRedirect();
  }, [status, session, router]);
}
