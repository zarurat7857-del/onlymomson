"use client";

import { useState, useEffect } from "react";
import FeedItem from "@/components/feed/FeedItem";
import PostModal from "@/components/feed/PostModal";
import AdSlot from "@/components/common/AdSlot";
import MobileMenu from "@/components/layout/MobileMenu";
import SeductiveLoader from "@/components/common/SeductiveLoader";
import { Video, RefreshCw, ArrowDownCircle } from "lucide-react";

export default function VideosPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 20;

  async function loadData(pageNum: number) {
    try {
      const res = await fetch(`/api/posts?type=video&page=${pageNum}&limit=${ITEMS_PER_PAGE}`);
      const newPosts = await res.json();
      
      if (newPosts.length < ITEMS_PER_PAGE) setHasMore(false);

      if (pageNum === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
    } catch (e) {
      console.error("Failed to load videos", e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    loadData(1);
  }, []);

  const handleShowMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    loadData(nextPage);
  };

  if (loading) return <SeductiveLoader />;

  return (
    <div className="min-h-screen pb-24">
      <MobileMenu />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-brand-purple/10 rounded-full border border-brand-purple/20">
                <Video className="text-brand-purple w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white">Viral Videos</h1>
        </div>

        <AdSlot id="VIDEOS-TOP-BANNER" type="banner" />

        {/* --- FIX: CHANGED FROM COLUMNS TO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-gray-500 mb-2">No videos found.</p>
            </div>
          )}
        </div>

        {/* SHOW MORE BUTTON */}
        {posts.length > 0 && hasMore && (
            <div className="flex justify-center mt-12 mb-8">
                <button 
                    onClick={handleShowMore}
                    disabled={loadingMore}
                    className="flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-brand-purple/20 border border-white/10 rounded-full text-sm font-bold uppercase tracking-wider transition-all group disabled:opacity-50"
                >
                    {loadingMore ? (
                        <>
                            <RefreshCw size={16} className="animate-spin text-brand-purple" />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <ArrowDownCircle size={16} className="text-brand-purple group-hover:translate-y-1 transition-transform" />
                            <span>Show More</span>
                        </>
                    )}
                </button>
            </div>
        )}

      </div>

      {selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}