"use client"
import React, { useRef, useEffect, useState } from "react";
import { useAuthContext } from "./provider";
import { NavBar } from "./_components/NavBar";
import { FooterName } from "./_components/FooterName";
import { Hero } from "./_components/Hero";


export default function Home() {
  // const user = auth?.currentUser;
  // console.log(user)
  const user = useAuthContext();
  console.log(user?.user)
  return (
    <div>
      
          
          
       
       <NavBar />
        
          <Hero />
        
     
    

      <FooterName />
    </div>
  );
}
