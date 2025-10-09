import type { Metadata } from "next";
import "../app/globals.css";
import MainProvider from "./provider";
import ConvexClientProvider from "@/app/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "DevCanvas.ai | AI-Powered Development Workspace",
  description: "DevCanvas.ai – An AI-powered development platform that transforms your ideas into production-ready code in seconds. Simplify your workflow, boost productivity, and build smarter with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <MainProvider>
            {children}
            <Toaster />
          </MainProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
