"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <MobileHeader /> {/* Visible only on Mobile */}
      
      <Sidebar onCollapse={setIsCollapsed} /> {/* Visible only on Desktop */}

      <main 
        className={`
            flex-1 w-full relative min-h-screen transition-all duration-300 ease-in-out pt-16 md:pt-0
            ${isCollapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        {children}
      </main>
    </>
  );
}