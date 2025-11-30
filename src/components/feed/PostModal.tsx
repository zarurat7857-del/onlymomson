"use client";
import { useEffect, useRef, useState } from "react";
import { X, Heart, MessageCircle, Share2, GripHorizontal, Play, Maximize2, Minimize2 } from "lucide-react";
import Image from "next/image";
import AdSlot from "../common/AdSlot"; 
import NeonVideoPlayer from "@/components/player/NeonVideoPlayer"; 

interface PostModalProps {
    post: any;
    onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    
    // --- STATE ---
    const [showAdOverlay, setShowAdOverlay] = useState(post?.type === "video");
    
    // MOBILE RESIZING STATE
    const [mobileVideoHeight, setMobileVideoHeight] = useState(40); // 40% default
    const [isResizing, setIsResizing] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false); // Track if fully open

    // --- RESIZING LOGIC ---
    const handleResizeStart = () => setIsResizing(true);
    
    const handleResizeMove = (clientY: number) => {
        if (!modalRef.current) return;
        const modalRect = modalRef.current.getBoundingClientRect();
        const newHeightInfo = clientY - modalRect.top;
        const totalHeight = modalRect.height;
        
        // Convert to percentage
        let newPercentage = (newHeightInfo / totalHeight) * 100;
        
        // Limits
        if (newPercentage < 20) newPercentage = 20;
        if (newPercentage > 85) newPercentage = 85;
        
        setMobileVideoHeight(newPercentage);
        // Reset maximized state if manually resizing
        if (newPercentage < 80) setIsMaximized(false);
    };

    // Toggle Maximize (The Button you wanted back!)
    const toggleMaximize = () => {
        if (isMaximized) {
            setMobileVideoHeight(40); // Go back to default
            setIsMaximized(false);
        } else {
            setMobileVideoHeight(100); // Full screen
            setIsMaximized(true);
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => { if (isResizing) handleResizeMove(e.clientY); };
        const handleTouchMove = (e: TouchEvent) => { if (isResizing) handleResizeMove(e.touches[0].clientY); };
        const handleUp = () => setIsResizing(false);

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('mouseup', handleUp);
            window.addEventListener('touchend', handleUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchend', handleUp);
        };
    }, [isResizing]);

    if (!post) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 overflow-hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
            
            <div 
                ref={modalRef}
                className="relative w-full max-w-6xl bg-[#0f0f0f] border-white/10 flex flex-col md:flex-row shadow-2xl md:border md:rounded-xl md:h-[85vh] h-[100dvh] overflow-hidden"
            >
                
                {/* --- MEDIA SECTION --- */}
                <div 
                    style={{ height: `${mobileVideoHeight}%` }}
                    className="relative bg-black flex items-center justify-center overflow-hidden transition-[height] duration-200 ease-out md:h-full md:flex-[1.5] md:!h-full"
                >
                    {/* Global Close Button */}
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 z-[60] bg-black/50 p-2 rounded-full text-white border border-white/10 backdrop-blur-md hover:bg-red-900/50 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* MAXIMIZE BUTTON (Restored!) - Only visible on Mobile */}
                    <button 
                         onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
                         className="absolute bottom-4 right-4 z-[60] bg-black/50 p-2 rounded-full text-cyan-400 border border-cyan-500/30 backdrop-blur-md md:hidden"
                    >
                        {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>

                    {/* Content Rendering */}
                    {post.type === "video" ? (
                         // If Ad is NOT showing, show Player with AutoPlay
                         !showAdOverlay ? (
                            <NeonVideoPlayer src={post.contentUrl} autoPlay={true} />
                         ) : (
                             // If Ad IS showing, show a static placeholder
                             <video src={post.contentUrl} className="w-full h-full object-contain opacity-30" />
                         )
                    ) : (
                        <div className="relative w-full h-full">
                            <Image 
                                src={post.contentUrl} 
                                alt="Post" 
                                fill 
                                unoptimized 
                                className="object-contain" 
                            />
                        </div>
                    )}

                    {/* Ad Overlay */}
                    {showAdOverlay && (
                        <div 
                            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <div className="relative bg-[#1a1a1a] rounded-xl border border-white/20 shadow-2xl w-full max-w-sm flex flex-col my-auto">
                                <div className="bg-white/5 p-3 text-center border-b border-white/10 shrink-0">
                                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Advertisement</span>
                                </div>
                                <div className="p-4 bg-black flex items-center justify-center min-h-[250px]">
                                    <AdSlot id="VIDEO-OVERLAY-AD" type="banner" className="scale-[0.85] origin-center" />
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAdOverlay(false);
                                    }}
                                    className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white font-bold text-sm py-4 transition-colors flex items-center justify-center gap-2 border-t border-white/10"
                                >
                                    <span>Close & Play Video</span>
                                    <Play size={16} fill="white" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- DRAG HANDLE (Mobile Only) --- */}
                <div 
                    className="w-full h-6 bg-[#1a1a1a] border-y border-white/10 flex items-center justify-center cursor-row-resize touch-none md:hidden z-20 shrink-0 active:bg-brand-pink/20"
                    onMouseDown={handleResizeStart}
                    onTouchStart={handleResizeStart}
                >
                    <GripHorizontal size={16} className="text-gray-500" />
                </div>

                {/* --- INFO SECTION --- */}
                <div className="flex-1 w-full flex flex-col bg-[#0f0f0f] border-l border-white/10 md:h-full overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-pink to-brand-purple p-[2px]">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs text-white">
                                    {post.username ? post.username[0] : "U"}
                                </div>
                            </div>
                            <span className="font-semibold text-sm text-white">{post.username || "Anonymous"}</span>
                        </div>
                        <button onClick={onClose} className="hidden md:block hover:text-red-500 text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        <AdSlot id="REC-WIDGET-1" type="widget" />
                        <div className="text-sm text-gray-300">
                            <span className="font-bold text-white mr-2">{post.username}</span>
                            {post.caption}
                        </div>
                        {/* Comments */}
                        <div className="space-y-4 mt-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="flex gap-3 text-sm">
                                    <div className="w-7 h-7 rounded-full bg-gray-800 flex-shrink-0" />
                                    <div>
                                        <p className="font-bold text-xs text-gray-400">User {i + 1}</p>
                                        <p className="text-gray-300">Scrolling works perfectly here while video stays fixed.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 border-t border-white/10 bg-[#0a0a0a] shrink-0">
                        <div className="flex justify-between mb-3 text-white">
                            <div className="flex gap-4">
                                <Heart className="hover:text-brand-pink cursor-pointer" />
                                <MessageCircle className="hover:text-blue-400 cursor-pointer" />
                                <Share2 className="hover:text-green-400 cursor-pointer" />
                            </div>
                        </div>
                        <p className="font-bold text-sm text-white">{post.likes ? post.likes.toLocaleString() : 0} likes</p>
                    </div>
                </div>
            </div>
        </div>
    );
}