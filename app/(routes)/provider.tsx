"use client"
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/app/provider';
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import axios from "axios";
import AppHeader from '@/app/_components/AppHeader';
import { AppSidebar } from '@/app/_components/AppSidebar';

function DashboardProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const user = useAuthContext();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

   useEffect(() => {
          // If user is not logged in, redirect to landing page
          if (user === null || !user.user) {
              router.replace('/');
          } else {
              // Optional: check user in DB
              checkUser();
          }
      }, [user]);


     const checkUser = async () => {
        try {
            await axios.post('/api/user', {
                userName: user?.user?.displayName,
                userEmail: user?.user?.email
            });
        } catch (error) {
            console.error("Error checking user:", error);
        } finally {
            setLoading(false);
        }
    }
     // While checking user or redirecting, show nothing or loader
    if (!user?.user || loading) return null;


    return (

        
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full'>
                <AppHeader />
                {/* <SidebarTrigger /> */}
                <div className='p-10'>{children}</div>
            </main>
        </SidebarProvider>

    )
}

export default DashboardProvider