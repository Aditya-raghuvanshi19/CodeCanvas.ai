"use client";

import React from "react";
import Project2Provider from "@/app/prompt-to-code/(main)/provider";

export default function SecondLayout({ children }: { children: React.ReactNode }) {
  return <Project2Provider>{children}</Project2Provider>;
}
