"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface NeonPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean; // New prop to handle start
}

export default function NeonVideoPlayer({ src, poster, autoPlay = false }: NeonPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  let controlTimeout: NodeJS.Timeout;

  // Handle Initial Autoplay
  useEffect(() => {
    if (autoPlay && videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
        setIsPlaying(true);
    }
  }, [autoPlay]);

  // Toggle Play
  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update Progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) setProgress((current / duration) * 100);
    }
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      videoRef.current.currentTime = (val / 100) * duration;
      setProgress(val);
    }
  };

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }
  };

  // Auto-hide controls
  const handleUserInteraction = () => {
    setShowControls(true);
    clearTimeout(controlTimeout);
    controlTimeout = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  return (
    <div 
      className="relative w-full h-full bg-black group overflow-hidden"
      onMouseMove={handleUserInteraction}
      onClick={handleUserInteraction}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        playsInline
        loop
        muted={isMuted} // React controls mute state
      />

      {/* --- NEON CONTROLS OVERLAY --- */}
      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-2 pt-12 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
        
        {/* Slider */}
        <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-fuchsia-500 hover:accent-fuchsia-400 mb-3"
        />

        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white hover:text-fuchsia-400 transition-colors">
              {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} />}
            </button>

            <button onClick={toggleMute} className="text-white/80 hover:text-cyan-400">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Big Center Play Button (only when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="p-4 rounded-full bg-black/40 border border-fuchsia-500/50 backdrop-blur-sm shadow-[0_0_30px_rgba(217,70,239,0.3)]">
            <Play fill="white" className="text-white ml-1" size={32} />
          </div>
        </div>
      )}
    </div>
  );
}