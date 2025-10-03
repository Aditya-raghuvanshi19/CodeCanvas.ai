"use client";
import { useAuthContext } from "../provider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "@/components/custom/LoadingScreen";

function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    console.log("User in DashboardProvider:", user);

    // Case 1: still loading (user === undefined)
    if (user === undefined) return;

    // Case 2: finished loading but no user
    if (user === null) {
      router.replace("/");
      return;
    }

    // Case 3: logged in user
    checkUser();
  }, [user]);

  const checkUser = async () => {
    try {
      await axios.post("/api/user", {
        userName: user?.displayName,
        userEmail: user?.email,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  // while firebase is loading OR DB check running
  if (user === undefined || checking) return <LoadingScreen />;

  return <>{children}</>;
}

export default DashboardProvider;
