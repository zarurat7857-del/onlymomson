"use client";
import Image from "next/image";
import MobileMenu from "@/components/layout/MobileMenu";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <MobileMenu />
            
            <div className="flex-1 flex flex-col items-center justify-center px-4 text-center py-10">
                <div className="relative w-32 h-32 mb-8">
                    <Image 
                        src="/assets/logo-small.png" 
                        alt="Logo"
                        fill
                        className="object-contain drop-shadow-[0_0_20px_rgba(217,70,239,0.5)]"
                    />
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                    ONLY<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">MOM</span>SON
                </h1>

                <div className="max-w-2xl text-gray-400 space-y-4 leading-relaxed text-lg">
                    <p>
                        Welcome to the premier destination for curated desi content. 
                        We are a community-driven platform dedicated to bringing you the most viral, 
                        trending, and exclusive stories, images, and videos from across the internet.
                    </p>
                </div>

                <div className="mt-12 flex gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
                    <span>Secure</span> • <span>Private</span> • <span>Premium</span>
                </div>
                
                <div className="mt-auto pt-10 text-xs text-gray-700 pb-4">
                    v1.0.0 • © 2025 OnlyMomsOn Inc.
                </div>
            </div>
        </div>
    );
}