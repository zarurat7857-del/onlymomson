"use client";

import { useState, useEffect } from "react";
import FeedItem from "@/components/feed/FeedItem";
import PostModal from "@/components/feed/PostModal";
import AdSlot from "@/components/common/AdSlot";
import MobileMenu from "@/components/layout/MobileMenu"; 
import SeductiveLoader from "@/components/common/SeductiveLoader";
import { Image as ImageIcon, RefreshCw, ArrowDownCircle } from "lucide-react";

export default function ImagesPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
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
      
      // Check if we reached the end
      if (newPosts.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      // If page 1, replace. If > 1, append.
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

  // Handle Manual Sync (Resets to Page 1)
  const handleSync = async () => {
    setSyncing(true);
    try {
        await fetch("/api/sync"); // Scrape Catbox
        setPage(1);               // Reset page count
        setHasMore(true);         // Reset end state
        await loadData(1);        // Reload fresh data
    } catch (e) {
        console.error("Sync failed", e);
    } finally {
        setSyncing(false);
    }
  };

  if (loading) return <SeductiveLoader />;

  return (
    <div className="min-h-screen pb-24">
      <MobileMenu />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Header with Sync Button */}
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-brand-pink/10 rounded-full border border-brand-pink/20">
                    <ImageIcon className="text-brand-pink w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold text-white">Image Gallery</h1>
            </div>

            {/* <button 
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-brand-pink/20 border border-white/10 rounded-full text-xs font-bold uppercase transition-all group"
            >
                <RefreshCw size={14} className={`text-gray-400 group-hover:text-white ${syncing ? "animate-spin text-brand-pink" : ""}`} />
                <span className={syncing ? "text-brand-pink" : "text-gray-400 group-hover:text-white"}>
                    {syncing ? "Syncing..." : "Refresh"}
                </span>
            </button> */}
        </div>

        <AdSlot id="IMAGES-TOP-BANNER" type="banner" />

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <FeedItem 
                  key={post.id} 
                  post={post} 
                  onClick={setSelectedPost} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
                <p className="text-gray-500 mb-2">No images found.</p>
                <p className="text-xs text-gray-600">Upload to Catbox then click Refresh.</p>
            </div>
          )}
        </div>

        {/* SHOW MORE BUTTON */}
        {posts.length > 0 && hasMore && (
            <div className="flex justify-center mt-12 mb-8">
                <button 
                    onClick={handleShowMore}
                    disabled={loadingMore}
                    className="flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-brand-pink/20 border border-white/10 rounded-full text-sm font-bold uppercase tracking-wider transition-all group disabled:opacity-50"
                >
                    {loadingMore ? (
                        <>
                            <RefreshCw size={16} className="animate-spin text-brand-pink" />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <ArrowDownCircle size={16} className="text-brand-pink group-hover:translate-y-1 transition-transform" />
                            <span>Show More</span>
                        </>
                    )}
                </button>
            </div>
        )}

        <AdSlot id="IMAGES-BOTTOM-BANNER" type="banner" />
      </div>

      {selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}