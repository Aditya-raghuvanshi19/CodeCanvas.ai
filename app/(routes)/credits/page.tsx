"use client";

import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Coins } from "lucide-react";

function Credits() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    user && GetUserCredits();
  }, [user]);

  const GetUserCredits = async () => {
    try {
      const result = await axios.get("/api/user?email=" + user?.email);
      setUserData(result.data);
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="font-semibold text-3xl mb-8 text-foreground tracking-tight">
        Credits Overview
      </h2>

      {/* ✨ Stylish Credit Card Section */}
      <div
        className="relative rounded-2xl p-[2px] bg-gradient-to-r from-primary via-purple-500 to-pink-500 shadow-lg"
      >
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-6
          bg-background rounded-2xl p-6"
        >
          <div className="flex items-center gap-5">
            <div
              className="p-5 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20
              text-primary flex items-center justify-center"
            >
              <Coins className="h-7 w-7" />
            </div>

            <div>
              <h3 className="font-semibold text-xl text-foreground">
                My Credits
              </h3>
              <p className="text-base text-muted-foreground mt-1">
                {userData?.credits
                  ? `${userData?.credits} Credits Left`
                  : "Fetching credits..."}
              </p>
            </div>
          </div>

           <Button size="lg" className="rounded-xl px-6">
          Buy More Credits
        </Button>
        </div>
      </div>

      <div className="mt-10 text-sm text-muted-foreground max-w-2xl leading-relaxed">
        <p>
          Your credits are used for converting wireframes to production-ready code.
          Upgrade anytime to continue generating projects seamlessly.
        </p>
      </div>
    </div>
  );
}

export default Credits;
