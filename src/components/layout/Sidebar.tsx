"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Home, BookOpen, Image as ImageIcon, Video, 
  MessageCircle, Bot, Settings, 
  ChevronRight, ChevronLeft,
  Mail, Info 
} from "lucide-react";

const LOGO_SRC = "/assets/logo-small.png"; 

export default function Sidebar({ onCollapse }: { onCollapse?: (collapsed: boolean) => void }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (onCollapse) onCollapse(isCollapsed);
  }, [isCollapsed, onCollapse]);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onCollapse) onCollapse(newState);
  };

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ImageIcon, label: "Images", href: "/images" },
    { icon: Video, label: "Videos", href: "/videos" },
    { icon: BookOpen, label: "Stories", href: "/stories" },
    { icon: MessageCircle, label: "Chat", href: "/chat" },
    { icon: Bot, label: "AI Tools", href: "/ai" },
    { icon: Mail, label: "Contact", href: "/contact" },
    { icon: Info, label: "About", href: "/about" },
  ];

  return (
    <aside 
      className={`
        hidden md:flex flex-col h-screen fixed left-0 top-0 z-50
        transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
        glass-sidebar
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-center relative h-24">
        <button 
          onClick={toggleSidebar}
          className="absolute right-[-12px] top-10 bg-[#1a1a1a] border border-white/10 text-gray-400 p-1 rounded-full hover:text-white hover:border-brand-pink transition-all z-50 shadow-lg"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
        
        {!isCollapsed ? (
             <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">
               ONLY<span className="text-white">MOM</span>SON
             </h1>
        ) : (
            <div className="relative w-12 h-12 transition-all duration-500 animate-in zoom-in spin-in-3">
                <Image 
                    src={LOGO_SRC} 
                    alt="Logo" 
                    fill
                    className="object-contain drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                />
            </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-2 mt-4 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group overflow-visible
                ${isCollapsed ? "justify-center" : ""}
                ${isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(192,132,252,0.9)]"></div>
              )}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent pointer-events-none rounded-xl" />
              )}
              
              <item.icon 
                className={`w-5 h-5 relative z-10 transition-all duration-300
                  ${isActive 
                    ? "text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]" 
                    : "group-hover:text-white group-hover:scale-110"
                  }
                `} 
              />
              
              {!isCollapsed && (
                <span className={`font-medium text-sm relative z-10 animate-in fade-in slide-in-from-left-2 duration-200 ${isActive ? "font-semibold tracking-wide" : ""}`}>
                  {item.label}
                </span>
              )}

              {/* SMOOTH TOOLTIP ANIMATION */}
              {isCollapsed && (
                <div className="absolute left-[calc(100%+10px)] px-3 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-xs font-medium text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-none 
                opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-[60] whitespace-nowrap">
                  {item.label}
                  {/* Tiny arrow pointing left */}
                  <div className="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-[#1a1a1a]" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Settings Link */}
      <div className="p-4 border-t border-white/5">
         <Link 
            href="/settings"
            className={`flex items-center relative group/footer rounded-xl transition-all duration-300
              ${isCollapsed ? 'justify-center py-2' : 'gap-3 px-2 py-2 hover:bg-white/5'} 
              text-gray-500 hover:text-white
            `}
         >
            <Settings className="w-5 h-5 group-hover/footer:rotate-90 transition-transform duration-500" />
            
            {!isCollapsed && <span className="text-sm">Settings</span>}

            {/* Settings Tooltip */}
            {isCollapsed && (
                <div className="absolute left-[calc(100%+10px)] px-3 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-xs font-medium text-white shadow-xl pointer-events-none 
                opacity-0 -translate-x-2 group-hover/footer:opacity-100 group-hover/footer:translate-x-0 transition-all duration-300 ease-out z-[60] whitespace-nowrap">
                  Settings
                  <div className="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-[#1a1a1a]" />
                </div>
            )}
        </Link>
      </div>
    </aside>
  );
}