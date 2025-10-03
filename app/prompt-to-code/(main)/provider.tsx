"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
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

function Project2Provider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [action, setAction] = useState<any>(null);
  const router = useRouter();
  const convex = useConvex();

  useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) {
        router.push("/prompt-to-code/second-tool");
        return;
      }
      const result = await convex.query(api.users.GetUser, { email: user?.email });
      setUserDetail(result);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY!}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_Id! }}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <ActionContext.Provider value={{ action, setAction }}>
              <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <SidebarProvider defaultOpen={false}>
                  <AppSideBar />
                  <main className="w-full">
                    <Header />
                    {children}
                  </main>
                </SidebarProvider>
              </NextThemesProvider>
            </ActionContext.Provider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  );
}

export default Project2Provider;
