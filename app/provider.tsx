"use client";
import { auth } from "@/configs/firebaseConfig";
import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { ThemeProvider } from "next-themes";

interface AuthContextType {
  user: User | null | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function MainProvider({ children }: { children: React.ReactNode }) {
  // use undefined as "loading"
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser);
      setUser(firebaseUser); // can be null or User
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    </ThemeProvider>
  );
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used inside MainProvider");
 
  return context;
};

export default MainProvider;
