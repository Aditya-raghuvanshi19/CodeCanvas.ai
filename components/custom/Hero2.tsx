"use client";

import React, { useContext, useState } from "react";
import { ArrowRight } from "lucide-react";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SignInDialog from "./SignInDialog";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { motion } from "framer-motion";
import { SparklesPreview } from "@/app/prompt-to-code/(main)/_components/Sparclespreview";

import { SparklesCore } from "../ui/sparkles";
import { useAuthContext } from "../../app/provider";
import LoadingScreen from "./LoadingScreen";


function Hero2() {
  const { userDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);

  const [userInput, setUserInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const { user } = useAuthContext();

  if (userDetail === undefined) {
  return <LoadingScreen />; // wait until Firebase / Convex finishes
  }

 const onGenerate = async (input: string) => {

  if (!userDetail?.name) {
    setOpenDialog(true);
    return;
  }

  if (userDetail?.token < 10) {
    toast("You don't have enough tokens to generate code");
    return;
  }

  const msg = { role: "user", content: input };
  setMessages([...messages, msg]);

  try {
    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    router.push("/prompt-to-code/workspace/" + workspaceId);
  } catch (err) {
    console.error(err);
    toast("Failed to create workspace. Try again.");
  }
};

  return (
    <div className="relative flex flex-col items-center justify-center mt-32 xl:mt-40 gap-6 px-4">
      {/* Background 3D Glow Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-200" />
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-extrabold text-5xl md:text-6xl text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        {Lookup.HERO_HEADING}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="text-gray-400 font-medium text-lg md:text-xl text-center max-w-2xl"
      >
        {Lookup.HERO_DESC}
      </motion.p>

      {/* Input Box with Glassmorphism */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="p-5 rounded-2xl max-w-2xl w-full mt-5 backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl"
      >
        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] blur-sm" />
          <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[3px] w-2/3 mx-auto blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-2/3 mx-auto" />


          {/* Sparkles animation */}
          
        <div className="flex gap-3 items-center">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-gray-200 placeholder-gray-400"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          {userInput && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 w-12 h-12 rounded-lg text-white cursor-pointer shadow-lg hover:shadow-blue-500/50 transition"
              />
            </motion.div>
          )}
        </div>
        
      
      
        
       
      </motion.div>
      
      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="flex mt-10 flex-wrap max-w-2xl items-center justify-center gap-3"
      >
        {Lookup.SUGGSTIONS.map((s, i) => (
          <HoverBorderGradient
            key={i}
            as="button"
            onClick={() => onGenerate(s)}
            containerClassName="rounded-full"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
          >
            {s}
          </HoverBorderGradient>
        ))}
      </motion.div>

      {/* Sign In Dialog */}
      <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(v)} />
    </div>
  );
}

export default Hero2;
