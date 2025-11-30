"use client";

import { useState, useEffect } from "react";
import TrendingSpotlight from "@/components/feed/TrendingSpotlight";
import PostModal from "@/components/feed/PostModal";
import FeedItem from "@/components/feed/FeedItem";
import AdSlot from "@/components/common/AdSlot";
import MobileMenu from "@/components/layout/MobileMenu";
import SeductiveLoader from "@/components/common/SeductiveLoader";
import { RefreshCw, ArrowDownCircle, Sparkles, AlertCircle } from "lucide-react";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); 
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 20;

  // --- CORE LOGIC: Fetch & Append ---
  async function fetchFeed(pageNum: number) {
    try {
      // 1. Fetch the data (The API handles the random selection)
      const res = await fetch(`/api/posts?page=${pageNum}&limit=${ITEMS_PER_PAGE}`);
      
      if (!res.ok) throw new Error("API Failed");
      
      let newPosts = await res.json();
      
      // 2. Client-Side Shuffle (Only shuffles the NEW batch, not the old ones)
      // This ensures the new block of 20 videos looks random
      newPosts = newPosts.sort(() => Math.random() - 0.5);
      
      // If the DB returned fewer items than requested, we are near the end
      if (newPosts.length < ITEMS_PER_PAGE) {
        setHasMore(false); 
      }

      if (pageNum === 1) {
        // First load: Set the data directly
        setPosts(newPosts);
      } else {
        // --- CRITICAL STEP: Strict Append & Dedupe ---
        setPosts((prev) => {
            // A. Create a Set of existing IDs to check against (Fast lookup)
            const existingIds = new Set(prev.map(p => p.id));
            
            // B. Filter out any video that is ALREADY on screen
            const uniqueNewPosts = newPosts.filter((p: any) => !existingIds.has(p.id));
            
            // C. Return OLD items + NEW unique items
            // This guarantees the top of the page NEVER changes or reloads
            return [...prev, ...uniqueNewPosts];
        });
      }
    } catch (error) {
      console.error("Failed to load feed", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  // Initial Load
  useEffect(() => {
    fetchFeed(1);
  }, []);

  // Handle "Show More"
  const handleShowMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchFeed(nextPage);
  };

  if (loading) return <SeductiveLoader />;

  return (
    <div className="min-h-screen bg-[#050505] pb-24 font-sans text-white">
      
      {/* Spotlight Section */}
      <section className="w-full max-w-7xl mx-auto md:mt-6">
         <TrendingSpotlight />
      </section>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Main Mixed Feed */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 md:mt-8">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
            <Sparkles size={18} className="text-brand-pink animate-pulse" />
            <h3 className="text-xl font-bold text-white tracking-tight">For You</h3>
        </div>
        
        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div 
                  // KEY IS CRITICAL: Using post.id ensures React doesn't re-render old items
                  key={post.id}
                  className="break-inside-avoid relative group animate-in fade-in zoom-in-95 duration-700 fill-mode-forwards"
                  // Stagger animation only applies to items as they appear
                  style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 50}ms` }}
              >
                 <div className="relative rounded-xl overflow-hidden border border-white/5 group-hover:border-brand-pink/50 transition-all duration-300">
                      <FeedItem 
                          post={post} 
                          onClick={setSelectedPost} 
                          className="!mb-0" 
                      />
                  </div>
              </div>
            ))
          ) : (
            // Empty State
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-white/10 rounded-xl bg-[#0a0a0a]">
                <AlertCircle size={32} className="text-brand-pink mb-2" />
                <p className="font-bold text-white mb-2">Feed Offline.</p>
                <p className="text-xs">Database might be empty.</p>
            </div>
          )}
        </div>

        {/* SHOW MORE BUTTON */}
        {posts.length > 0 && hasMore && (
            <div className="flex justify-center mt-12 mb-8">
                <button 
                    onClick={handleShowMore}
                    disabled={loadingMore}
                    className="
                        flex items-center gap-2 px-8 py-3 
                        bg-[#0a0a0a] border border-white/20 rounded-full 
                        text-xs font-bold uppercase tracking-widest 
                        hover:border-brand-pink hover:bg-brand-pink/5 
                        transition-all group disabled:opacity-50
                    "
                >
                    {loadingMore ? (
                        <>
                            <RefreshCw size={14} className="animate-spin text-brand-pink" />
                            <span>Mixing Content...</span>
                        </>
                    ) : (
                        <>
                            <ArrowDownCircle size={14} className="text-gray-400 group-hover:text-white transition-colors" />
                            <span>Load More</span>
                        </>
                    )}
                </button>
            </div>
        )}
        
        {/* End of Feed Message */}
        {!hasMore && posts.length > 0 && (
             <div className="text-center mt-12 mb-8 opacity-50">
                <p className="text-[10px] uppercase tracking-widest">End of Stream</p>
             </div>
        )}

      </section>

      <AdSlot id="BOTTOM-WIDGET-456" type="widget" />

      {selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      <AdSlot id="STICKY-FOOTER-789" type="sticky" />
    </div>
  );
}