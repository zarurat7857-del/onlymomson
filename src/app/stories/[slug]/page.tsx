import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Tag } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import AdSlot from "@/components/common/AdSlot";
import { getStoryContent } from "@/lib/github";

interface StoryPageProps {
    params: Promise<{ slug: string }>;
}

export default async function StoryReader({ params }: StoryPageProps) {
    // 1. Wait for params
    const resolvedParams = await params;
    
    // 2. Decode URL (Turn "My%20Story" back into "My Story")
    const slug = decodeURIComponent(resolvedParams.slug);
    
    // 3. Fetch content
    const { frontmatter, content } = await getStoryContent(slug);

    if (!content) {
        return (
            <div className="min-h-screen bg-[#050505] pb-24 text-gray-400">
                <MobileMenu />
                <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
                    <h2 className="text-xl font-bold text-white mb-2">Story Not Found</h2>
                    <p className="mb-6 text-sm">Could not retrieve content for "{slug}"</p>
                    <Link href="/stories" className="px-6 py-2 bg-brand-pink/10 text-brand-pink rounded-full hover:bg-brand-pink hover:text-white transition-colors">
                        Return to Library
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24 bg-[#050505]">
            <MobileMenu />
            
            <div className="max-w-3xl mx-auto px-4 md:px-8 py-6">
                <Link href="/stories" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={16} /> Back to Stories
                </Link>

                <header className="mb-8 border-b border-white/10 pb-6">
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                        {frontmatter.title || slug}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1 text-brand-pink">
                            <User size={14} />
                            <span className="font-bold">{frontmatter.author || "Anon"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{frontmatter.date || "Recent"}</span>
                        </div>
                        {frontmatter.tags && (
                            <div className="flex gap-2 ml-auto">
                                {frontmatter.tags.map((tag: any) => (
                                    <span key={tag} className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded text-xs border border-white/10">
                                        <Tag size={10} /> {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </header>

                <AdSlot id="STORY-READER-TOP" type="banner" />

                <article className="prose prose-invert prose-lg max-w-none prose-headings:text-brand-purple prose-a:text-brand-pink prose-strong:text-white text-gray-300 leading-relaxed mt-8">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </article>

                <div className="mt-12 pt-8 border-t border-white/10">
                     <AdSlot id="STORY-READER-BOTTOM" type="widget" />
                </div>
            </div>
        </div>
    );
}