"use client";

import { useAuthContext } from "@/app/provider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DesignCard from "./_components/DesignCard";
import { RECORD } from "@/app/view-code/[uid]/page";

function Designs() {
  const { user } = useAuthContext();
  const [wireframeList, setWireframeList] = useState<RECORD[]>([]);

  useEffect(() => {
    if (user) {
      GetAllUserWireframe();
    }
  }, [user]);

  const GetAllUserWireframe = async () => {
    try {
      const result = await axios.get(
        `/api/wireframe-to-code?email=${user?.email}`
      );
      console.log(result.data);
      setWireframeList(result.data);
    } catch (error) {
      console.error("Error fetching wireframes:", error);
    }
  };

 
  if (!user) return <p>Please log in to view your designs.</p>;

  return (
    <div>
      <h2 className="font-bold text-2xl">Wireframe & Codes</h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
        {wireframeList?.map((item, index) => (
          <DesignCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Designs;
