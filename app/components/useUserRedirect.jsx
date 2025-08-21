"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useUserRedirect() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const role = session?.user?.role;
    const profileCompleted = session?.user?.profileCompleted;

    // Only redirect if the user's profile is incomplete and they are not on the /select-role page.
    if (!role || !profileCompleted) {
      if (router.pathname !== '/select-role') {
        router.replace("/select-role");
      }
    } else {
      const redirectPath = role === "organization" ? "/organization" : "/teacher";
      if (router.pathname !== redirectPath) {
        router.replace(redirectPath);
      }
    }
  }, [status, session, router]);
}