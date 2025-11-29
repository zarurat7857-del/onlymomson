import Link from "next/link";
import { BookOpen, User } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import AdSlot from "@/components/common/AdSlot";
import { getStories } from "@/lib/github";
import React from "react";

export default async function StoriesPage() {
    const stories = await getStories();

    return (
        <div className="min-h-screen pb-24">
            <MobileMenu />

            <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-lg shadow-orange-900/20">
                        <BookOpen className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Trending Stories</h1>
                </div>

                {/* Top Ad */}
                <AdSlot id="STORIES-TOP-BANNER" type="banner" className="mb-8" />

                <div className="grid gap-4">
                    {stories.length > 0 ? (
                        stories.map((story: any, index: number) => (
                            <React.Fragment key={index}>
                                {/* Inline Ad (Every 5th item to be safe, or just index 2) */}
                                {index === 2 && (
                                    <div className="w-full my-4 py-4 border-y border-white/5 bg-[#0a0a0a]">
                                        <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest mb-2">Sponsored</p>
                                        <AdSlot id={`STORY-INLINE-${index}`} type="banner" />
                                    </div>
                                )}

                                <Link href={`/stories/${encodeURIComponent(story.slug)}`}>
                                    <div className="group relative bg-[#0f0f0f] border border-white/5 hover:border-brand-pink/50 rounded-xl p-6 transition-all duration-300 hover:bg-white/5 cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-lg font-bold text-white group-hover:text-brand-pink transition-colors">
                                                {story.title || story.slug}
                                            </h2>
                                            <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">
                                                {story.date || "Unknown"}
                                            </span>
                                        </div>
                                        
                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                            {story.description || "Click to read more..."}
                                        </p>
                                        
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1 text-brand-purple">
                                                <User size={12} /> {story.author || "Anon"}
                                            </span>
                                            {story.tags && (
                                                <div className="flex gap-2 ml-auto">
                                                    {story.tags.slice(0, 2).map((tag: string) => (
                                                        <span key={tag} className="text-xs border border-white/10 px-2 py-0.5 rounded-full bg-white/5">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </React.Fragment>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            <p>No stories found.</p>
                            <p className="text-xs mt-2">Make sure your GitHub Repo is Public and has .md files in the /content folder.</p>
                        </div>
                    )}
                </div>
            </div>
            <AdSlot id="STICKY-FOOTER-STORIES" type="sticky" />
        </div>
    );
}