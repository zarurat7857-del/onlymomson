"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function MobileMenu() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Images", href: "/images" },
    { label: "Videos", href: "/videos" },
    { label: "Stories", href: "/stories" },
    { label: "Chat", href: "/chat" },
    { label: "Mom radar", href: "/momRadar" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ];

  // Auto-scroll to active item
  useEffect(() => {
    if (scrollRef.current) {
      const activeItem = scrollRef.current.querySelector('[data-active="true"]');
      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center' // Centers the item
        });
      }
    }
  }, [pathname]);

  return (
    <div className="md:hidden w-full sticky top-16 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/5 py-3">
      <div 
        ref={scrollRef} 
        className="flex gap-3 overflow-x-auto px-4 no-scrollbar items-center"
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              // Mark active item for the auto-scroller
              data-active={isActive} 
              className={`
                flex-shrink-0 px-5 py-2 rounded-full border transition-all duration-300 text-xs font-bold uppercase tracking-wider whitespace-nowrap
                ${isActive 
                    ? "bg-gradient-to-r from-brand-purple to-brand-pink border-transparent text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]" 
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}