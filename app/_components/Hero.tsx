"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Cover } from "@/components/ui/cover";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { SparklesCore } from "@/components/ui/sparkles";
import { NavbarButton } from "@/components/ui/resizable-navbar";
import { useAuthContext } from "@/app/provider";
import { User } from "lucide-react";
import Authentication from "./Authentication";

export function Hero() {
  const user = useAuthContext();

  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Build websites in <Cover> seconds </Cover> - from prompts or wireframes.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Whether it’s a quick idea or a rough sketch — <br /> transform prompts or wireframes into real, responsive websites with the power of AI.
        </p>
        
         
           
          <div className="mt-8 gap-3 flex justify-center">
            {user?.user?.email ?
              
                <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-6 py-3"
            >
            <a href="/dashboard">
                   <span>Get Started</span>
                </a>
           
          </HoverBorderGradient>
              
              : <Authentication >
               <HoverBorderGradient>Get Started </HoverBorderGradient>
              </Authentication>
            }
              
               
          <NavbarButton variant="primary" className="flex">Book a call</NavbarButton>
          
          
        </div>
      </div>
    </div>
  );
}
