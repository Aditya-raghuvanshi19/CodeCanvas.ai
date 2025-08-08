"use client"
import { auth } from '@/configs/firebaseConfig';
import { AuthContext } from '@/context/AuthContext';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider } from "next-themes";

interface AuthContextType {
    user: User | null;
}

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Cleanup
    }, []);

    return (
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext.Provider value={{ user }}>
        {children}
      </AuthContext.Provider>
    </ThemeProvider>
    )
}

// Custom hook to use auth
export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default Provider

