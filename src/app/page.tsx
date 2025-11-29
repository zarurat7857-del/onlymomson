"use client";

import { useState, useEffect } from "react";
import TrendingSpotlight from "@/components/feed/TrendingSpotlight";
import PostModal from "@/components/feed/PostModal";
import FeedItem from "@/components/feed/FeedItem";
import AdSlot from "@/components/common/AdSlot";
import MobileMenu from "@/components/layout/MobileMenu";
import SeductiveLoader from "@/components/common/SeductiveLoader";
import { RefreshCw, ArrowDownCircle } from "lucide-react";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Initial full-page load
  const [loadingMore, setLoadingMore] = useState(false); // Button loading state
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 20;

  // Unified Fetch Function
  async function fetchFeed(pageNum: number) {
    try {
      // Append query params for pagination
      const res = await fetch(`/api/posts?page=${pageNum}&limit=${ITEMS_PER_PAGE}`);
      
      if (!res.ok) throw new Error("API Failed");
      
      const newPosts = await res.json();
      
      // If we got fewer items than requested, we've reached the end
      if (newPosts.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      // If page 1, replace data. If page > 1, append data.
      if (pageNum === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
    } catch (error) {
      console.error("Failed to load feed", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  // Initial Load (Page 1)
  useEffect(() => {
    fetchFeed(1);
  }, []);

  // Handle "Show More" Click
  const handleShowMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage); // Update state
    fetchFeed(nextPage); // Fetch next chunk
  };

  // Show full loader only on initial mount
  if (loading) return <SeductiveLoader />;

  return (
    <div className="min-h-screen pb-24">
      
      {/* Spotlight Section */}
      <section className="w-full max-w-7xl mx-auto md:mt-6">
         <TrendingSpotlight />
      </section>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Main Mixed Feed */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 md:mt-0">
        <h3 className="text-xl font-bold mb-4 text-white/80 hidden md:block">Premium Feed</h3>
        
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
            // Empty State
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="font-bold text-white mb-2">No posts found.</p>
                <p className="text-xs">Database might be empty. Sync via Images/Videos page.</p>
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
        
        {/* End of Feed Message */}
        {!hasMore && posts.length > 0 && (
             <div className="text-center mt-12 mb-8">
                <div className="inline-block px-4 py-1 bg-white/5 rounded-full border border-white/5">
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">You have reached the end</p>
                </div>
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