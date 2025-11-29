import Image from "next/image";

// Path to your saved image in the public folder
const LOADING_LOGO_SRC = "/assets/logo-small.png";

export default function SeductiveLoader() {
    return (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center">
             {/* The Container for the glowing heart */}
            <div className="relative w-40 h-40 flex items-center justify-center">
                
                {/* 1. The Background Glow (Pulsing heavy blur) */}
                {/* We keep a slower pulse on the glow for depth */}
                <div className="absolute inset-0 rounded-full bg-brand-pink/40 blur-3xl animate-pulse"></div>

                {/* 2. The Logo Image with Heartbeat Animation */}
                {/* z-20 ensures it sits above the glow */}
                <div className="relative z-20 animate-heartbeat">
                    <Image 
                        src={LOADING_LOGO_SRC}
                        alt="Loading"
                        width={120}
                        height={120}
                        // Added a crisp drop shadow to make the logo pop
                        className="object-contain drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]"
                    />
                </div>
            </div>
            
            {/* Loading Text */}
            <p className="mt-6 text-xs tracking-[0.3em] text-brand-pink/70 uppercase animate-pulse font-medium">
                    {/* text */}
            </p>
        </div>
    );
}