// hooks/useSignOut.js
"use client";
import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.replace("/"); // redirect after logout
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return handleSignOut;
}
