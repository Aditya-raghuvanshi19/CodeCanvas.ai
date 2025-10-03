"use client";
import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth";

function SideBarFooter() {
  const router = useRouter();

  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Help Center",
      icon: HelpCircle,
    },
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/prompt-to-code/pricing",
    },
    {
      name: "Sign Out",
      icon: LogOut,
      action: "logout", // instead of path
    },
  ];

  const onOptionClick = (option) => {
    if (option.action === "logout") {
      signOut(auth)
        .then(() => {
          router.replace("/"); // redirect to home/login page
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    } else if (option.path) {
      router.push(option.path);
    }
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          key={index}
          variant="ghost"
          className="w-full flex justify-start gap-2 my-3"
        >
          <option.icon className="w-5 h-5" />
          <span>{option.name}</span>
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
