"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Instagram,
  Flame,
  Globe,
  Image as ImageIcon,
  ChevronRight,
  Cpu,
  Search,
  Terminal,
  Loader2, // Added Loader icon
} from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import AdSlot from "@/components/common/AdSlot";
import Image from "next/image";

// --- STATIC DATA (Videos & Agents are still static for now) ---
const CRAWLER_VIDEOS = [
  { id: 1, title: "Yoga Class Secret Recording", duration: "12:45", views: "120k", img: "https://placehold.co/1280x720/1a1a1a/FFF?text=Video+1", source: "Tube_Scraper_X" },
  { id: 2, title: "Step-Mom Stuck in Dryer", duration: "08:30", views: "95k", img: "https://placehold.co/1280x720/1a1a1a/FFF?text=Video+2", source: "Vid_Hunter" },
  { id: 3, title: "Late Night Snack", duration: "15:20", views: "200k", img: "https://placehold.co/1280x720/1a1a1a/FFF?text=Video+3", source: "Tube_Scraper_X" },
];

const SPECIALIST_CRAWLERS = [
  { id: 1, name: "Desi Mom Pics", description: "Scours Indian social feeds for sarees & aunties.", status: "Online", count: "142 items", speed: "Fast" },
  { id: 2, name: "Mature Leaks", description: "Indexes forgotten archives from 2010-2015.", status: "Scanning", count: "89 items", speed: "Slow" },
  { id: 3, name: "Neighbor Watch", description: "Filters public posts for 'real' amateur content.", status: "Idle", count: "Synced", speed: "Avg" },
  { id: 4, name: "Teacher Confessions", description: "Text & Image scraper from anonymous boards.", status: "Online", count: "12 items", speed: "Fast" },
];

export default function CrawlerPage() {
  // --- STATE MANAGEMENT ---
  // 1. Initialize with EMPTY arrays, not mock data
  const [discoveredProfiles, setDiscoveredProfiles] = useState<any[]>([]);
  const [archiveItems, setArchiveItems] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  
  // 2. Add Loading State
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch Profiles
            const profileRes = await fetch('/api/crawler/profiles');
            const profiles = await profileRes.json();
            if (Array.isArray(profiles)) {
                 const formattedProfiles = profiles.map((p: any) => ({
                    id: p.id,
                    handle: p.handle,
                    img: `https://placehold.co/200x200/22c55e/FFF?text=${p.handle.substring(1,3).toUpperCase()}`, 
                    origin: "Web Search"
                 }));
                 setDiscoveredProfiles(formattedProfiles);
            }

            // Fetch Archive Images
            const feedRes = await fetch('/api/crawler/feed');
            const feedData = await feedRes.json();
            if (Array.isArray(feedData)) {
                const formattedFeed = feedData.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    type: item.type,
                    img: item.url,
                    source: item.source
                }));
                setArchiveItems(formattedFeed);
            }

        } catch (e) {
            console.error("Failed to load crawler data", e);
        } finally {
            // Stop loading whether it worked or failed
            setIsLoading(false);
        }
    };

    fetchData();
  }, []);

  // Filter Logic
  const displayedArchive = selectedAgent
    ? archiveItems.filter((item) => item.source === selectedAgent)
    : archiveItems;

  return (
    <div className="min-h-screen bg-[#050505] pb-24 text-white font-sans selection:bg-brand-pink/30">
      <MobileMenu />

      <div className="max-w-7xl mx-auto px-0 md:px-6 py-6 space-y-10">
        {/* --- HEADER --- */}
        <div className="px-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">
              System Online // v2.4.0
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-2">
            MOM{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">
              RADAR
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-mono">
            <span>• Data Sources: 12</span>
            <span>• Status: {isLoading ? "Synchronizing..." : "Active"}</span>
          </div>
        </div>

        <div className="px-4">
          <AdSlot id="CRAWLER-TOP-BANNER" type="banner" />
        </div>

        {/* --- SECTION 1: DISCOVERED TARGETS --- */}
        <section>
          <SectionHeader title="Discovered Targets" icon={Search} color="text-brand-pink" />
          
          {isLoading ? (
             // LOADING SKELETON FOR PROFILES
             <div className="flex gap-4 px-4 overflow-hidden">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-[140px] h-[180px] bg-white/5 rounded-xl animate-pulse border border-white/5" />
                ))}
             </div>
          ) : (
             <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 no-scrollbar">
                {discoveredProfiles.map((profile) => (
                <div key={profile.id} className="snap-center shrink-0 w-[140px] h-[180px] bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden group hover:border-brand-pink/50 transition-colors relative">
                    <Image src={profile.img} alt={profile.handle} fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-300" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3 w-full">
                    <p className="text-sm font-bold text-white truncate mb-1 tracking-tight drop-shadow-md">{profile.handle}</p>
                    <div className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] text-brand-pink border border-brand-pink/30">
                        <Globe size={8} />
                        <span className="truncate max-w-[90px]">{profile.origin}</span>
                    </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
                    <Instagram size={12} className="text-white/80" />
                    </div>
                </div>
                ))}
            </div>
          )}
        </section>

        {/* --- SECTION 2: VIDEO SURVEILLANCE --- */}
        <section className="px-4">
          <SectionHeader title="Video Surveillance" icon={Flame} color="text-orange-500" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative aspect-video bg-[#111] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
              <Image src={CRAWLER_VIDEOS[0].img} alt="Featured" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <div className="inline-block px-2 py-1 bg-orange-500 text-black text-[10px] font-bold uppercase rounded mb-2">Featured Capture</div>
                <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{CRAWLER_VIDEOS[0].title}</h3>
                <p className="text-xs text-gray-400 font-mono">Source: {CRAWLER_VIDEOS[0].source} • {CRAWLER_VIDEOS[0].duration}</p>
              </div>
              <div className="absolute center inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play fill="white" size={24} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {CRAWLER_VIDEOS.slice(1).map((video) => (
                <div key={video.id} className="relative flex-1 bg-[#111] rounded-xl overflow-hidden border border-white/10 group cursor-pointer min-h-[120px]">
                  <Image src={video.img} alt={video.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h4 className="text-sm font-bold text-white line-clamp-1">{video.title}</h4>
                    <p className="text-[10px] text-gray-400">{video.views} views</p>
                  </div>
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 rounded text-[9px] font-mono border border-white/10">
                    {video.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE ARCHIVE --- */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded bg-white/5 border border-white/5 text-brand-purple`}>
                    <ImageIcon size={16} />
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                    {selectedAgent ? `${selectedAgent} Feed` : "Mom's Archive"}
                </h2>
            </div>
            {selectedAgent && (
                <button onClick={() => setSelectedAgent(null)} className="text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-wider">
                    Clear Filter ✕
                </button>
            )}
          </div>
          
          {isLoading ? (
             // LOADING STATE FOR ARCHIVE
             <div className="py-20 flex flex-col items-center justify-center text-gray-500 gap-3">
                 <Loader2 className="animate-spin text-brand-purple" size={32} />
                 <p className="text-xs font-mono uppercase tracking-widest">Decrypting Archives...</p>
             </div>
          ) : (
             <div className="columns-2 md:columns-4 gap-4 space-y-4">
                {displayedArchive.length > 0 ? (
                    displayedArchive.map((item) => (
                        <div key={item.id} className="break-inside-avoid relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 hover:border-brand-purple/50 transition-colors group cursor-pointer">
                            <div className="relative">
                            <Image src={item.img} alt={item.title} width={600} height={800} className="w-full h-auto object-cover" unoptimized />
                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-bold text-white border border-white/10">
                                {item.type}
                            </div>
                            </div>
                            <div className="p-3">
                            <p className="text-[10px] text-gray-500 font-mono uppercase mb-1 flex items-center gap-1">
                                <Terminal size={8} /> {item.source}
                            </p>
                            <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">{item.title}</h4>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center text-gray-500">
                        No items found for this filter.
                    </div>
                )}
             </div>
          )}
        </section>

        {/* --- SECTION 4: ACTIVE AGENTS --- */}
        <section className="px-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-cyan-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Active System Agents</h2>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <div className="w-2 h-2 rounded-full bg-green-500/20" />
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {SPECIALIST_CRAWLERS.map((bot) => (
                <div key={bot.id} onClick={() => setSelectedAgent(selectedAgent === bot.name ? null : bot.name)} className={`p-4 flex items-center gap-4 transition-all cursor-pointer group ${selectedAgent === bot.name ? "bg-white/10 border-l-2 border-cyan-400 pl-3.5" : "hover:bg-white/5 border-l-2 border-transparent"}`}>
                  <div className="relative">
                    <div className={`w-2 h-2 rounded-full ${bot.status === "Online" ? "bg-green-500" : bot.status === "Scanning" ? "bg-cyan-500 animate-pulse" : "bg-yellow-500"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-mono font-bold ${selectedAgent === bot.name ? "text-white" : "text-cyan-400"}`}>{bot.name}</h4>
                      <span className="text-[10px] font-mono text-gray-500">{bot.count}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{bot.description}</p>
                  </div>
                  <ChevronRight size={14} className={`transition-colors ${selectedAgent === bot.name ? "text-cyan-400" : "text-gray-600 group-hover:text-white"}`} />
                </div>
              ))}
            </div>
            <div className="bg-black/40 px-4 py-2 text-[10px] font-mono text-gray-600 text-center border-t border-white/5">
              System Idle... Waiting for next batch
            </div>
          </div>
        </section>

        <div className="px-4">
          <AdSlot id="CRAWLER-BOTTOM-WIDGET" type="widget" />
        </div>
      </div>
    </div>
  );
}

// --- HELPER ---
function SectionHeader({ title, icon: Icon, color }: { title: string; icon: any; color: string; }) {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded bg-white/5 border border-white/5 ${color}`}>
          <Icon size={16} />
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
      </div>
      <button className="text-[10px] font-bold text-gray-500 hover:text-white flex items-center gap-1 uppercase tracking-wider transition-colors">
        View All <ChevronRight size={12} />
      </button>
    </div>
  );
}