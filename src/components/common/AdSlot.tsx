"use client";
import { useEffect, useRef } from "react";

interface AdSlotProps {
  id: string; // The Zone ID from ExoClick
  type: "banner" | "widget" | "sticky";
  className?: string;
}

export default function AdSlot({ id, type, className = "" }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is where you would normally trigger the ad push
    // For ExoClick, usually, the script tag does the work based on the div ID
    // Example: (window as any).exoclick_add_slot(id);
    console.log(`Initializing Ad Zone: ${id}`);
  }, [id]);

  if (type === "sticky") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[40] bg-[#050505] border-t border-white/10 p-1 flex justify-center">
         <div className="w-[728px] h-[90px] bg-gray-800 animate-pulse flex items-center justify-center text-xs text-gray-500">
            Sticky Banner Ad (Zone {id})
         </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center my-6 ${className}`}>
        {/* Placeholder for development */}
        <div className={`${type === 'widget' ? 'w-full h-64' : 'w-[300px] h-[250px]'} bg-gray-900/50 border border-white/5 rounded-lg flex items-center justify-center text-xs text-gray-600`}>
             ExoClick {type === 'widget' ? 'Recommendation Widget' : 'Banner'} (Zone {id})
        </div>
    </div>
  );
}