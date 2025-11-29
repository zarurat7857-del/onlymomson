"use client";

import Image from "next/image";
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from "lucide-react";
import { useState } from "react";

// ... Interface (PostProps) stays the same ...
interface PostProps {
  username: string;
  avatarUrl?: string;
  contentUrl: string;
  caption: string;
  likes: number;
  comments: number;
  tags: string[];
  type: "image" | "video";
}

export default function PostCard({ 
  username, 
  contentUrl, 
  caption, 
  likes, 
  comments, 
  tags,
  type 
}: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    // Changed bg-card to glass-card logic defined in CSS
    <div className="w-full max-w-md mx-auto glass-card rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
             <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">
                {username[0].toUpperCase()}
             </div>
          </div>
          <div>
            <p className="font-semibold text-sm text-white hover:text-purple-300 cursor-pointer transition-colors">{username}</p>
            <p className="text-[10px] text-gray-400">Original Audio</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="relative aspect-[4/5] bg-black/50">
        {type === "video" ? (
             <video 
                src={contentUrl} 
                controls 
                className="w-full h-full object-contain" 
             />
        ) : (
            <div className="relative w-full h-full">
                <Image 
                    src={contentUrl} 
                    alt="Post content" 
                    fill
                    className="object-cover"
                />
            </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-5">
                <button onClick={handleLike} className="transition-transform active:scale-95 group">
                    <Heart className={`w-7 h-7 transition-colors ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white group-hover:text-rose-400'}`} />
                </button>
                <button className="transition-transform active:scale-95 group">
                    <MessageCircle className="w-7 h-7 text-white group-hover:text-blue-400 transition-colors" />
                </button>
                <button className="transition-transform active:scale-95 group">
                    <Share2 className="w-7 h-7 text-white group-hover:text-green-400 transition-colors" />
                </button>
            </div>
            <button className="group">
                <Bookmark className="w-7 h-7 text-white group-hover:text-yellow-400 transition-colors" />
            </button>
        </div>

        {/* Likes */}
        <p className="font-bold text-sm mb-2 text-white">{likeCount.toLocaleString()} likes</p>

        {/* Caption */}
        <div className="space-y-1 mb-2">
            <p className="text-sm text-gray-200 leading-relaxed">
                <span className="font-bold mr-2 text-white">{username}</span>
                {caption}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium text-purple-300 hover:text-purple-200 cursor-pointer bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>

        <button className="text-gray-500 text-sm mt-1 hover:text-gray-300 transition-colors">
            View all {comments} comments
        </button>
      </div>
    </div>
  );
}