"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, Heart, MessageCircle } from "lucide-react";

interface FeedItemProps {
    post: any;
    onClick: (post: any) => void;
}

export default function FeedItem({ post, onClick }: FeedItemProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Format numbers (e.g., 1.2k)
    const formatCount = (num: number) => {
        if(num >= 1000) return (num/1000).toFixed(1) + 'k';
        return num;
    };

    const handleMouseEnter = () => {
        if (post.type === "video" && videoRef.current) {
            videoRef.current.muted = true;
            // Play promise handling to avoid browser errors
            var playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => setIsPlaying(true))
                .catch(error => console.log("Autoplay prevented"));
            }
        }
    };

    const handleMouseLeave = () => {
        if (post.type === "video" && videoRef.current) {
            videoRef.current.pause();
            // Reset to first frame (thumbnail view)
            videoRef.current.currentTime = 0.1; 
            setIsPlaying(false);
        }
    };

    const handleClick = () => {
        if (post.type === "video" && videoRef.current) {
            videoRef.current.pause();
        }
        onClick(post);
    };

    return (
        <div 
            className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/5 hover:border-brand-pink/50 transition-all duration-300 mb-4"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-full">
                {post.type === "video" ? (
                    <>
                        <video 
                            ref={videoRef}
                            // #t=0.1 forces the browser to fetch the 0.1s frame as the thumbnail
                            src={`${post.contentUrl}#t=0.1`} 
                            preload="metadata"
                            loop 
                            playsInline
                            muted
                            className="w-full h-auto object-cover block"
                        />
                        {!isPlaying && (
                            <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full backdrop-blur-sm z-20">
                                <Play size={12} fill="white" className="text-white" />
                            </div>
                        )}
                    </>
                ) : (
                    <Image 
                        src={post.contentUrl} 
                        alt={post.caption} 
                        width={600} 
                        height={800} 
                        // FIXED: Added unoptimized to allow Catbox images to load without server errors
                        unoptimized
                        className="w-full h-auto object-cover block"
                    />
                )}

                {/* Info Overlay with Stats */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
                    <p className="text-white font-bold text-sm truncate mb-1">{post.caption}</p>
                    
                    <div className="flex items-center justify-between">
                        <p className="text-brand-pink text-xs font-medium">@{post.username}</p>
                        
                        {/* Likes & Comments Count */}
                        <div className="flex items-center gap-3 text-gray-300">
                            <div className="flex items-center gap-1">
                                <Heart size={12} className="text-white fill-white/10" />
                                <span className="text-[10px] font-bold">{formatCount(post.likes)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle size={12} className="text-white" />
                                <span className="text-[10px] font-bold">{formatCount(post.comments)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}