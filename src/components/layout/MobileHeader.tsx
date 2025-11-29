"use client";
import Image from "next/image";
import Link from "next/link";
import { Bell, User } from "lucide-react";

export default function MobileHeader() {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-4">
      {/* Branding */}
      <Link href="/" className="flex items-center gap-2">
        {/* <div className="relative w-8 h-8">
             <Image 
                src="/assets/logo-small.png" 
                alt="Logo" 
                fill 
                unoptimized
                className="object-contain drop-shadow-[0_0_10px_rgba(217,70,239,0.6)]" 
             />
        </div> */}
        <h1 className="text-lg font-black tracking-wider bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">
          ONLY<span className="text-white">MOM</span>SON
        </h1>
      </Link>

      {/* Action Icons */}
      <div className="flex items-center gap-3">
         <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-pink rounded-full animate-pulse border border-black"></span>
         </button>
         
         {/* USER SETTINGS LINK */}
         <Link href="/settings" className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-pink to-brand-purple p-[1px] cursor-pointer">
             <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                 <User size={16} className="text-white" />
             </div>
         </Link>
      </div>
    </header>
  );
}