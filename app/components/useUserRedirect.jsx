"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useUserRedirect() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      console.log("useUserRedirect: Waiting for authentication…");
      return;
    }

    const currentPath = window.location.pathname;
    const role = session?.user?.role;
    const profileCompleted = session?.user?.profileCompleted;

    console.log("useUserRedirect: Current pathname:", currentPath, "Session:", {
      role,
      profileCompleted,
    });

    async function handleRedirect() {
      if (!role || !profileCompleted || role === "user") {
        if (currentPath !== "/select-role" && currentPath !== "/auth") {
          router.replace("/select-role");
        }
        return;
      }

      // ✅ ORG flow
      if (role === "organization") {
        let orgId = session?.user?.id; // add this in next-auth callback
        if (!orgId) {
          try {
            const res = await fetch("/api/user/organizationdata");
            if (res.ok) {
              const data = await res.json();
              orgId = data.id;
            }
          } catch (err) {
            console.error("useUserRedirect: Failed to fetch org data", err);
          }
        }
        const redirectPath = orgId ? `/organization/${orgId}` : "/organization";
        if (currentPath !== redirectPath) {
          console.log("Redirecting to org:", redirectPath);
          router.replace(redirectPath);
        }
      }

      // ✅ TEACHER flow
      if (role === "teacher") {
        let teacherId = session?.user?.id;
        if (!teacherId) {
          try {
            const res = await fetch("/api/user/teacherdata");
            if (res.ok) {
              const data = await res.json();
              teacherId = data.user?._id;
            }
          } catch (err) {
            console.error("useUserRedirect: Failed to fetch teacher data", err);
          }
        }
        const redirectPath = teacherId ? `/teacher/${teacherId}` : "/teacher";
        if (currentPath !== redirectPath) {
          console.log("Redirecting to teacher:", redirectPath);
          router.replace(redirectPath);
        }
      }
    }

    handleRedirect();
  }, [status, session, router]);
}
