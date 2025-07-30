import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useUserRedirect() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [hasCheckedRole, setHasCheckedRole] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkUserRole = async () => {
      if (status !== "authenticated" || !session?.user?.email || hasCheckedRole) {
        return;
      }

      if (!isMounted) return;

      setHasCheckedRole(true);

      try {
        if (typeof session.user.role === "undefined" || typeof session.user.profileCompleted === "undefined") {
          console.warn("Incomplete session data, redirecting to /select-role", {
            email: session.user.email,
          });
          router.push("/select-role");
          return;
        }

        if (session.user.role && session.user.profileCompleted) {
          const redirectPath = session.user.role === "organization" ? "/organization" : "/teacher";
          console.log(`Redirecting to ${redirectPath}`, {
            role: session.user.role,
            email: session.user.email,
          });
          router.push(redirectPath);
        } else {
          console.log("No role or profile incomplete, redirecting to /select-role", {
            email: session.user.email,
          });
          router.push("/select-role");
        }
      } catch (error) {
        console.error("Error checking user role:", {
          message: error.message,
          stack: error.stack,
          email: session.user.email,
        });
        toast.error("Error checking user role. Please try again.");
      }
    };

    checkUserRole();

    return () => {
      isMounted = false;
    };
  }, [status, session, router, hasCheckedRole]);
}