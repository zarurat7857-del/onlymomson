"use client"; // Ensure client component
import { MessageCircle, Lock } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu"; // Import Menu

export default function ChatPage() {
    return (
        <div>Feature to Roll out soon...</div>
        // <div className="min-h-screen flex flex-col items-center pb-24 bg-[#050505]">
            
        //     {/* ADD MOBILE MENU */}
        //     <MobileMenu />

        //     <div className="mt-10 px-4 text-center w-full max-w-3xl">
        //         <div className="p-4 bg-white/5 rounded-full inline-block mb-6 border border-white/10">
        //             <MessageCircle size={48} className="text-brand-pink" />
        //         </div>
        //         <h1 className="text-3xl font-bold text-white mb-2">Live Chat Rooms</h1>
        //         <p className="text-gray-400 mb-8">Connect with other members in real-time.</p>

        //         <div className="grid md:grid-cols-2 gap-4 w-full text-left">
        //             {["General Lounge", "Desi Confessions", "Video Discussion"].map((room) => (
        //                 <div key={room} className="bg-[#0f0f0f] border border-white/10 p-6 rounded-xl flex items-center justify-between group cursor-pointer hover:border-brand-pink/50 transition-all">
        //                     <div>
        //                         <h3 className="text-white font-bold">{room}</h3>
        //                         <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
        //                             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        //                             128 Online
        //                         </p>
        //                     </div>
        //                     <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm">
        //                         Join
        //                     </button>
        //                 </div>
        //             ))}
                    
        //             {/* Premium Room */}
        //             <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-brand-pink/30 p-6 rounded-xl flex items-center justify-between opacity-75">
        //                 <div>
        //                     <h3 className="text-white font-bold flex items-center gap-2">
        //                          VIP Lounge <Lock size={14} className="text-yellow-500" />
        //                     </h3>
        //                     <p className="text-xs text-yellow-500 mt-1">Premium Members Only</p>
        //                 </div>
        //                 <button className="bg-brand-pink/20 text-brand-pink border border-brand-pink/50 px-4 py-2 rounded-lg text-sm">
        //                     Upgrade
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}