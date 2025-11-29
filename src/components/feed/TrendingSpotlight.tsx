"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { TrendingUp, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import AdSlot from "../common/AdSlot";

const spotlights = [
    // UPDATED: Using real Catbox links to prevent 500 errors
    { type: 'content', id: 1, title: "#1 Trending Video", subtitle: "Viral leaked footage", img: "https://files.catbox.moe/j6eqen.jpg" },
    { type: 'ad', id: 'TOP-BANNER-123', title: "Premium Partner", subtitle: "Sponsored Content" }, 
    { type: 'content', id: 2, title: "Saree Collection", subtitle: "New Desi Uploads", img: "https://files.catbox.moe/nyu26y.jpg" },
    { type: 'content', id: 3, title: "Live Now", subtitle: "Priya is online", img: "https://files.catbox.moe/bndj2k.jpg" },
];

export default function TrendingSpotlight() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % spotlights.length);
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? spotlights.length - 1 : prev - 1));

    useEffect(() => {
        const duration = spotlights[current].type === 'ad' ? 6000 : 4000;
        const timer = setInterval(nextSlide, duration);
        return () => clearInterval(timer);
    }, [current]);

    return (
        <div className="w-full h-48 md:h-64 relative rounded-xl overflow-hidden group mb-8 border border-white/10 bg-[#0f0f0f]">
            
            {spotlights.map((item, index) => {
                const isActive = index === current;
                
                return (
                    <div 
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    >
                        {item.type === 'ad' ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90"></div>
                                
                                {/* AD UNIT */}
                                <div className="relative z-20 scale-90 md:scale-100">
                                    <AdSlot id={item.id as string} type="banner" />
                                </div>

                                {/* SPONSORED BADGE */}
                                <div className="absolute top-4 left-4 bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 px-2 py-1 text-[10px] rounded uppercase font-bold tracking-widest z-30 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                                    Sponsored
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* UPDATED IMAGE COMPONENT */}
                                {item.img && (
                                    <Image 
                                        src={item.img} 
                                        alt={item.title || "Spotlight"} 
                                        fill 
                                        unoptimized // FIXES THE SERVER CRASH
                                        className="object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                
                                <div className="absolute bottom-0 left-0 p-6 w-full pointer-events-none">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-brand-purple text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                                            <TrendingUp size={10} /> Spotlight
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-black text-white mb-1 drop-shadow-lg">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-300 text-sm flex items-center gap-2">
                                        {item.subtitle} <Sparkles size={12} className="text-yellow-400" />
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40">
                <button onClick={prevSlide} className="p-2 bg-black/50 hover:bg-brand-pink/50 rounded-full text-white backdrop-blur-sm border border-white/10">
                    <ChevronLeft size={20} />
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40">
                <button onClick={nextSlide} className="p-2 bg-black/50 hover:bg-brand-pink/50 rounded-full text-white backdrop-blur-sm border border-white/10">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* DOT INDICATORS */}
            <div className="absolute top-4 right-4 flex gap-1 z-40">
                {spotlights.map((_, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setCurrent(idx)}
                        className={`h-1 rounded-full transition-all duration-300 shadow-md ${idx === current ? "w-6 bg-brand-pink" : "w-2 bg-white/30"}`} 
                    />
                ))}
            </div>
        </div>
    );
}