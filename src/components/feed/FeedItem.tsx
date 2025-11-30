"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Play, Heart, MessageCircle, WifiOff } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

interface FeedItemProps {
    post: any;
    onClick: (post: any) => void;
    className?: string;
}

export default function FeedItem({ post, onClick, className = "" }: FeedItemProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { isLowDataMode } = useNetworkStatus();

    // LOGIC: If on slow data AND a low-res URL exists, use it. 
    // Otherwise, stick to the main contentUrl.
    const activeVideoSrc = (isLowDataMode && post.lowResUrl) 
        ? post.lowResUrl 
        : post.contentUrl;

    const formatCount = (num: number) => {
        if(num >= 1000) return (num/1000).toFixed(1) + 'k';
        return num;
    };

    const handleMouseEnter = () => {
        // If Low Data Mode is ON, DO NOT auto-play on hover to save data
        if (isLowDataMode) return;

        if (post.type === "video" && videoRef.current) {
            videoRef.current.muted = true;
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
            // Reset to thumbnail timestamp
            videoRef.current.currentTime = 0.1; 
            setIsPlaying(false);
        }
    };

    return (
        <div 
            className={`break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/5 hover:border-brand-pink/50 transition-all duration-300 mb-4 ${className}`}
            onClick={() => onClick(post)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-full">
                {post.type === "video" ? (
                    <>
                        <video 
                            ref={videoRef}
                            // Important: #t=0.1 fetches ONLY the first frame, acting as a thumbnail
                            src={`${activeVideoSrc}#t=0.1`} 
                            // If slow internet, use "none" to block downloading until user clicks
                            preload={isLowDataMode ? "none" : "metadata"}
                            loop 
                            playsInline
                            muted
                            className="w-full h-auto object-cover block"
                        />
                        
                        {/* Play Icon Logic */}
                        {!isPlaying && (
                            <div className="absolute top-2 right-2 flex flex-col items-end gap-2 z-20">
                                {/* Show a "Low Data" icon if we are saving bandwidth */}
                                {isLowDataMode && (
                                    <div className="bg-yellow-500/80 p-1.5 rounded-full backdrop-blur-sm shadow-sm">
                                        <WifiOff size={10} className="text-black" />
                                    </div>
                                )}
                                <div className="bg-black/60 p-1.5 rounded-full backdrop-blur-sm">
                                    <Play size={12} fill="white" className="text-white" />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <Image 
                        src={post.contentUrl} 
                        alt={post.caption} 
                        width={600} 
                        height={800} 
                        unoptimized
                        className="w-full h-auto object-cover block"
                    />
                )}

                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
                    <p className="text-white font-bold text-sm truncate mb-1">{post.caption}</p>
                    <div className="flex items-center justify-between">
                        <p className="text-brand-pink text-xs font-medium">@{post.username}</p>
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