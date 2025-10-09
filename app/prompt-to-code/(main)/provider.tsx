"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/custom/AppSideBar";
import Header from "@/components/custom/Header";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../provider";
import LoadingScreen from "../../../components/custom/LoadingScreen";


function Project2Provider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [userDetail, setUserDetail] = useState<any>(undefined);
  const [action, setAction] = useState<any>(null);
  const { user } = useAuthContext();
  const router = useRouter();
  const convex = useConvex();
  
  
  
  useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
  if (typeof window !== "undefined") {
    const localUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!localUser) {
      setUserDetail(null); // user not logged in
      router.push("/prompt-to-code/second-tool"); // optional redirect
      return;
    }
    
    const result = await convex.query(api.users.GetUser, { email: localUser.email });
    setUserDetail(result); // logged in
  }
};

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY!}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_Id! }}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <ActionContext.Provider value={{ action, setAction }}>
             <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <SidebarProvider defaultOpen={false}>
                  <AppSideBar />
                  <main className="w-full">
                    <Header />
                    {children}
                  </main>
                </SidebarProvider>
              </ThemeProvider>
            </ActionContext.Provider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  );
}

export default Project2Provider;
