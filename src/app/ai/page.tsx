"use client";
import { useState, useEffect } from "react";
import { Bot, RefreshCw, ShieldCheck, Database, Clock, Zap, Image as ImageIcon, Video, BookOpen, Terminal } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import AdSlot from "@/components/common/AdSlot";

// Define our "Bots"
const CRAWLERS = [
    { 
        id: "picbot-v1", 
        name: "MILF_PicBot", 
        type: "Images", 
        icon: ImageIcon, 
        status: "Active", 
        interval: "4h",
        sources: ["Verified APIs", "Social Feeds"],
        color: "text-brand-pink",
        stats: "128 new items"
    },
    { 
        id: "vidbot-x", 
        name: "Desi_VidBot", 
        type: "Videos", 
        icon: Video, 
        status: "Scanning...", 
        interval: "4h",
        sources: ["Tube APIs", "Public Domains"],
        color: "text-brand-purple",
        stats: "12 pending"
    },
    { 
        id: "story-ai", 
        name: "Story_Weaver", 
        type: "Stories", 
        icon: BookOpen, 
        status: "Sleeping", 
        interval: "6h",
        sources: ["Text Repos", "User Subs"],
        color: "text-yellow-400",
        stats: "Up to date"
    }
];

export default function AIPage() {
    const [logs, setLogs] = useState<string[]>([
        "> System Initialized...",
        "> Connecting to Safe-Search Database...",
        "> API Handshake Successful [200 OK]",
    ]);

    // Simulate "Live" logs appearing
    useEffect(() => {
        const interval = setInterval(() => {
            const newLogs = [
                "> Skimming legal sources...",
                "> Validating media compliance...",
                "> Embedding approved content...",
                "> MILF-Specific filter applied...",
                "> Updating database index...",
                "> Ad slots refreshed..."
            ];
            const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
            const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
            
            setLogs(prev => [`[${timestamp}] ${randomLog}`, ...prev.slice(0, 6)]);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen pb-24 bg-[#050505]">
            <MobileMenu />

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">System Online</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                        {/* Crawler <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Hub</span> */}
                    (In development)
                    </h1>
                    
                    <p className="text-gray-400 text-sm max-w-lg mx-auto">
                        Automated content curation bots. These agents scour the web every 4 hours to bring you fresh, legal, and trending content.
                    </p>
                </div>

                {/* Top Ad */}
                <AdSlot id="AI-TOP-BANNER" type="banner" />

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <StatCard icon={Clock} label="Update Cycle" value="4 Hours" />
                    <StatCard icon={Database} label="Content Added" value="1.2k+" />
                    <StatCard icon={ShieldCheck} label="Compliance" value="100%" />
                    <StatCard icon={Zap} label="Server Load" value="12%" />
                </div>

                {/* Crawler Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {CRAWLERS.map((bot) => (
                        <div key={bot.id} className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-pink/30 transition-all duration-300">
                            
                            {/* Background Pulse */}
                            <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 -z-10 bg-gradient-to-br from-white to-transparent transition-opacity group-hover:opacity-40`} />

                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 bg-white/5 rounded-xl ${bot.color}`}>
                                    <bot.icon size={24} />
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                    bot.status === "Active" ? "border-green-500/30 text-green-500 bg-green-500/10" : 
                                    bot.status === "Scanning..." ? "border-blue-500/30 text-blue-500 bg-blue-500/10 animate-pulse" :
                                    "border-yellow-500/30 text-yellow-500 bg-yellow-500/10"
                                }`}>
                                    {bot.status}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{bot.name}</h3>
                            <p className="text-xs text-gray-500 mb-4 font-mono">{bot.id}</p>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Target</span>
                                    <span className="text-white font-bold">{bot.type}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Sources</span>
                                    <span className="text-white text-xs text-right max-w-[100px] truncate">{bot.sources.join(", ")}</span>
                                </div>
                                <div className="flex justify-between text-sm pt-3 border-t border-white/5">
                                    <span className="text-gray-400">Last Batch</span>
                                    <span className={bot.color}>{bot.stats}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* The "Hacker" Terminal Log */}
                <div className="bg-black border border-white/10 rounded-xl p-4 font-mono text-xs md:text-sm overflow-hidden relative">
                    <div className="flex items-center gap-2 mb-4 text-gray-500 border-b border-white/5 pb-2">
                        <Terminal size={14} />
                        <span>System Logs (Live Stream)</span>
                    </div>
                    <div className="space-y-2 h-32 overflow-y-auto no-scrollbar flex flex-col-reverse">
                        {logs.map((log, i) => (
                            <p key={i} className={`truncate ${i === 0 ? "text-green-400 font-bold" : "text-gray-600"}`}>
                                {log}
                            </p>
                        ))}
                    </div>
                    
                    {/* Overlay Gradient to fade out bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                </div>

                {/* Bottom Ad */}
                <div className="mt-8">
                    <AdSlot id="AI-BOTTOM-WIDGET" type="widget" />
                </div>
            </div>
        </div>
    );
}

// Helper Component for Stats
function StatCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="bg-[#111] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <Icon size={20} className="text-gray-500 mb-2" />
            <p className="text-white font-bold text-lg">{value}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
        </div>
    );
}