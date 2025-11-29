"use client";
import { useEffect, useRef, useState } from "react";
import { X, Heart, MessageCircle, Share2, Play } from "lucide-react";
import Image from "next/image";
import AdSlot from "../common/AdSlot"; 

interface PostModalProps {
    post: any;
    onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showAdOverlay, setShowAdOverlay] = useState(post?.type === "video");
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (post?.type === "video" && videoRef.current) {
            if (showAdOverlay) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play().catch(() => console.log("Autoplay prevented"));
                setIsPlaying(true);
            }
        }
    }, [showAdOverlay, post]);

    const togglePlay = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (showAdOverlay) return;
        
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    if (!post) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity" onClick={onClose} />
            
            <div className="relative w-full max-w-6xl h-full md:h-[85vh] bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
                
                {!showAdOverlay && (
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 z-[60] bg-black/50 p-2 rounded-full text-white border border-white/10 backdrop-blur-md hover:bg-red-900/50 transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}

                <div 
                    className={`
                        flex-[1.5] bg-black relative flex items-center justify-center overflow-hidden group
                        ${showAdOverlay ? 'h-auto min-h-[450px] md:h-full' : 'h-[40vh] md:h-full'} 
                    `}
                    onClick={togglePlay}
                >
                    {post.type === "video" ? (
                        <>
                            <video 
                                ref={videoRef}
                                src={post.contentUrl} 
                                controls={!showAdOverlay} 
                                playsInline
                                onClick={togglePlay}
                                className="w-full h-full object-contain cursor-pointer" 
                            />
                            
                            {!showAdOverlay && !isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-black/40 p-4 rounded-full backdrop-blur-sm border border-white/20">
                                        <Play size={32} fill="white" className="text-white ml-1" />
                                    </div>
                                </div>
                            )}
                            
                            {showAdOverlay && (
                                <div 
                                    className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()} 
                                >
                                    <div className="relative bg-[#1a1a1a] rounded-xl border border-white/20 shadow-2xl w-full max-w-sm flex flex-col my-auto">
                                        <div className="bg-white/5 p-3 text-center border-b border-white/10 shrink-0">
                                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Advertisement</span>
                                        </div>
                                        <div className="p-4 bg-black flex items-center justify-center min-h-[250px]">
                                            <AdSlot id="VIDEO-OVERLAY-AD" type="banner" className="!my-0 scale-[0.85] md:scale-100 origin-center" />
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowAdOverlay(false);
                                            }}
                                            className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white font-bold text-sm py-4 transition-colors flex items-center justify-center gap-2 shrink-0 active:bg-brand-purple border-t border-white/10"
                                        >
                                            <span>Close & Play Video</span>
                                            <Play size={16} fill="white" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="relative w-full h-full">
                            {/* --- THE FIX IS HERE --- */}
                            <Image 
                                src={post.contentUrl} 
                                alt="Post" 
                                fill 
                                unoptimized // <--- THIS MAKES THE IMAGE VISIBLE
                                className="object-contain" 
                            />
                        </div>
                    )}
                </div>

                <div className={`
                    flex-1 w-full flex flex-col border-l border-white/10 bg-[#0f0f0f]
                    ${showAdOverlay ? 'hidden md:flex h-[60vh] md:h-full' : 'h-[60vh] md:h-full'}
                `}>
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-pink to-brand-purple p-[2px]">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs text-white">
                                    {post.username[0]}
                                </div>
                            </div>
                            <span className="font-semibold text-sm text-white">{post.username}</span>
                        </div>
                        {!showAdOverlay && (
                             <button onClick={onClose} className="hidden md:block hover:text-red-500 text-white transition-colors">
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        <AdSlot id="REC-WIDGET-1" type="widget" />
                        <div className="text-sm text-gray-300">
                            <span className="font-bold text-white mr-2">{post.username}</span>
                            {post.caption}
                        </div>
                    </div>

                    <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
                        <div className="flex justify-between mb-3 text-white">
                            <div className="flex gap-4">
                                <Heart className="hover:text-brand-pink cursor-pointer transition-colors" />
                                <MessageCircle className="hover:text-blue-400 cursor-pointer transition-colors" />
                                <Share2 className="hover:text-green-400 cursor-pointer transition-colors" />
                            </div>
                        </div>
                        <p className="font-bold text-sm text-white">{post.likes.toLocaleString()} likes</p>
                    </div>
                </div>
            </div>
        </div>
    );
}