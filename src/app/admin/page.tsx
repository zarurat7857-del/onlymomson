"use client";
import { useState } from "react";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminPage() {
    const [status, setStatus] = useState("Idle");
    const [stats, setStats] = useState<any>(null);

    const handleSync = async () => {
        setStatus("Syncing...");
        try {
            const res = await fetch("/api/sync");
            const data = await res.json();
            setStats(data);
            setStatus("Success");
        } catch (error) {
            setStatus("Error");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-8 text-brand-pink">Admin Dashboard</h1>
            
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl max-w-md w-full text-center">
                <p className="text-gray-400 mb-6">Click below to scan Catbox albums and update the database.</p>
                
                <button 
                    onClick={handleSync}
                    disabled={status === "Syncing..."}
                    className="w-full py-4 bg-brand-purple hover:bg-brand-pink rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    <RefreshCw className={status === "Syncing..." ? "animate-spin" : ""} />
                    {status === "Syncing..." ? "Scanning Catbox..." : "Sync Database Now"}
                </button>

                {status === "Success" && stats && (
                    <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <CheckCircle size={18} /> 
                            <span className="font-bold">Sync Complete</span>
                        </div>
                        <p className="text-sm">Scanned: {stats.scanned} files</p>
                        <p className="text-sm">New Added: {stats.added}</p>
                    </div>
                )}
            </div>
        </div>
    );
}