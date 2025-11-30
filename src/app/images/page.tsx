"use client";

import { useState, useEffect } from "react";
import FeedItem from "@/components/feed/FeedItem";
import PostModal from "@/components/feed/PostModal";
import AdSlot from "@/components/common/AdSlot";
import MobileMenu from "@/components/layout/MobileMenu"; 
import SeductiveLoader from "@/components/common/SeductiveLoader";
import { 
  Image as ImageIcon, 
  RefreshCw, 
  ArrowDownCircle, 
  Terminal, 
  Server, 
  Lock,
  Database,
  Zap
} from "lucide-react";

export default function ImagesPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // Pagination State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 20;

  // Unified Fetch Function
  async function loadData(pageNum: number) {
    try {
      const res = await fetch(`/api/posts?type=image&page=${pageNum}&limit=${ITEMS_PER_PAGE}`);
      const newPosts = await res.json();
      
      if (newPosts.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      if (pageNum === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
    } catch (e) {
      console.error("Failed to load images", e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  // Initial Load
  useEffect(() => {
    loadData(1);
  }, []);

  // Handle "Show More"
  const handleShowMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    loadData(nextPage);
  };

  if (loading) return <SeductiveLoader />;

  return (
    <div className="min-h-screen bg-[#050505] pb-24 text-white font-sans selection:bg-brand-pink/30">
      <MobileMenu />

      <div className="max-w-7xl mx-auto px-0 md:px-6 py-6 space-y-8">
        
        {/* --- HEADER DASHBOARD --- */}
        <div className="px-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3 mb-3">
                <div className="h-2 w-2 rounded-full bg-brand-pink animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_15px_#d946ef]" />
                <span className="text-[10px] font-mono text-brand-pink uppercase tracking-[0.2em] animate-pulse">
                    System Online // v.TharkiBeta.69
                </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-2">
                चित्र <span className="text-lg md:text-2xl font-mono not-italic text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple tracking-normal ml-2 opacity-80">
                    // ONLYMOMSON
                </span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-mono mt-4 bg-[#0a0a0a] p-3 rounded-lg border border-white/5 inline-flex shadow-inner">
                <div className="flex items-center gap-2">
                    <Server size={12} className="text-brand-pink" />
                    <span>Cache: ONLYMOMSON_Pics</span>
                </div>
                <div className="h-3 w-[1px] bg-white/10" />
                <div className="flex items-center gap-2">
                    <Lock size={12} className="text-brand-purple" />
                    <span>Protocol: xPantyDropper69</span>
                </div>
                <div className="h-3 w-[1px] bg-white/10" />
                <div className="flex items-center gap-2">
                    
                    <Zap size={12} className="text-yellow-400" />
                    <span>DickRatePerHour: 4D/hr</span>
                </div>
                <div className="h-3 w-[1px] bg-white/10" />
                <div className="flex items-center gap-2">
                    
                    <Database size={12} className="text-green-500" />
                    <span>mom.pink.pussy.Access: Granted</span>
                </div>
            </div>
        </div>

        <div className="px-4">
             <AdSlot id="IMAGES-TOP-BANNER" type="banner" />
        </div>

        {/* --- MAIN GRID SECTION --- */}
        <div className="px-4">
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-white/5 border border-white/5 text-brand-pink shadow-[0_0_10px_rgba(217,70,239,0.2)]">
                        <ImageIcon size={16} />
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Live Feed</h2>
                </div>
                <div className="text-[10px] font-mono text-brand-pink/70 uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-ping" />
                    Streaming slutty moms...
                </div>
            </div>

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div 
                            key={post.id} 
                            className="break-inside-avoid relative group animate-in fade-in zoom-in-95 duration-700 fill-mode-forwards"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="relative rounded-xl overflow-hidden border border-white/5 group-hover:border-brand-pink/50 group-hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] transition-all duration-300">
                                <FeedItem 
                                    post={post} 
                                    onClick={setSelectedPost}
                                    // FIXED: Added !mb-0 to remove extra space at bottom
                                    className="!mb-0" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-pink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl bg-[#0a0a0a]">
                        <Terminal size={32} className="mx-auto text-brand-pink/50 mb-4 animate-pulse" />
                        <p className="text-gray-500 font-mono text-sm mb-2">/usr/bin/gallery: No Data Found</p>
                        <p className="text-xs text-gray-700">Awaiting user input. Initiate upload sequence.</p>
                    </div>
                )}
            </div>
        </div>

        {/* --- LOAD MORE --- */}
        {posts.length > 0 && hasMore && (
            <div className="flex justify-center mt-12 mb-8 px-4">
                <button 
                    onClick={handleShowMore}
                    disabled={loadingMore}
                    className="
                        relative overflow-hidden group
                        flex items-center gap-3 px-8 py-3 
                        bg-[#0a0a0a] border border-white/20 
                        rounded-full 
                        hover:border-brand-pink hover:bg-brand-pink/5 hover:shadow-[0_0_30px_rgba(217,70,239,0.25)]
                        active:scale-95
                        transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed
                    "
                >
                    {loadingMore ? (
                        <>
                            <RefreshCw size={16} className="animate-spin text-brand-pink" />
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-pink">Decrypting Data...</span>
                        </>
                    ) : (
                        <>
                            <div className="p-1 rounded-full bg-white/10 group-hover:bg-brand-pink group-hover:text-black transition-colors duration-300">
                                <ArrowDownCircle size={14} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                                Execute: Fetch_Next_Batch
                            </span>
                        </>
                    )}
                </button>
            </div>
        )}

        <div className="px-4">
             <AdSlot id="IMAGES-BOTTOM-BANNER" type="banner" />
        </div>
      </div>

      {selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}