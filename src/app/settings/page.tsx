"use client";
import { User, Bell, Shield, Moon, LogOut, Trash2, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
    return (
        <div className="min-h-screen py-8 px-4 md:px-8 pb-24">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-gray-400 mb-8">Manage your account preferences and privacy.</p>

                {/* Profile Card */}
                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 mb-8 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-pink to-brand-purple p-[2px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                             {/* Placeholder Avatar */}
                             <User className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-white">Guest User</h2>
                        <p className="text-sm text-gray-400">Free Tier</p>
                    </div>
                    <button className="px-4 py-2 bg-brand-pink/10 text-brand-pink border border-brand-pink/20 rounded-lg text-sm font-bold hover:bg-brand-pink hover:text-white transition-all">
                        Upgrade to Premium
                    </button>
                </div>

                {/* Settings Groups */}
                <div className="space-y-6">
                    
                    {/* Preferences */}
                    <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/5 bg-white/5">
                            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Preferences</h3>
                        </div>
                        <div className="divide-y divide-white/5">
                            <SettingItem icon={Bell} title="Notifications" value="On" />
                            <SettingItem icon={Moon} title="Dark Mode" value="Always On" />
                            <SettingItem icon={Shield} title="Privacy Mode" value="Enabled" />
                        </div>
                    </div>

                    {/* Data & Privacy */}
                    <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden">
                         <div className="p-4 border-b border-white/5 bg-white/5">
                            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Data & Storage</h3>
                        </div>
                        <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3 text-red-400">
                                <Trash2 size={20} />
                                <span className="font-medium">Clear Watch History</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-600 group-hover:text-white" />
                        </div>
                    </div>

                    {/* Logout */}
                    <button className="w-full py-4 mt-4 flex items-center justify-center gap-2 text-red-500 font-bold bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                        <LogOut size={20} />
                        Log Out
                    </button>
                    
                    <p className="text-center text-xs text-gray-600 mt-4">
                        Version 1.2.0 • Build 2025.11
                    </p>
                </div>
            </div>
        </div>
    );
}

// Helper Component for List Items
function SettingItem({ icon: Icon, title, value }: { icon: any, title: string, value: string }) {
    return (
        <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 text-gray-200">
                <Icon size={20} className="text-gray-400 group-hover:text-brand-pink transition-colors" />
                <span className="font-medium">{title}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{value}</span>
                <ChevronRight size={16} className="text-gray-600 group-hover:text-white" />
            </div>
        </div>
    );
}