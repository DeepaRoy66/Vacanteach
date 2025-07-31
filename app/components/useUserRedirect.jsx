"use client";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useUserRedirect() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const redirected = useRef(false); // To prevent multiple redirects

  useEffect(() => {
    if (status !== "authenticated" || redirected.current) return;

    const role = session?.user?.role;
    const profileCompleted = session?.user?.profileCompleted;

    redirected.current = true;

    if (!role || !profileCompleted) {
      console.log("Incomplete profile, redirecting to /select-role");
      router.replace("/select-role"); // `replace` avoids pushing to history stack
    } else {
      const redirectPath = role === "organization" ? "/organization" : "/teacher";
      console.log(`Redirecting to ${redirectPath}`);
      router.replace(redirectPath);
    }
  }, [status, session, router]);
}
