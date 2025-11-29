import Link from "next/link";
import { BookOpen } from "lucide-react";

interface StoryProps {
  id: string;
  title: string;
  author: string;
  isPremium?: boolean;
}

export default function Story({ id, title, author, isPremium = false }: StoryProps) {
  return (
    <Link href={`/stories/${id}`} className="flex flex-col items-center gap-2 group cursor-pointer min-w-[80px]">
      <div className={`
        w-16 h-16 rounded-full p-[2px] 
        ${isPremium ? 'bg-gradient-to-tr from-yellow-400 to-orange-600' : 'bg-gradient-to-tr from-purple-500 to-pink-500'}
      `}>
        <div className="w-full h-full rounded-full bg-background flex items-center justify-center border-2 border-background group-hover:bg-accent transition-colors">
           <BookOpen className="w-6 h-6 text-muted-foreground group-hover:text-white" />
        </div>
      </div>
      <span className="text-xs text-center truncate w-20 text-muted-foreground group-hover:text-white">
        {title}
      </span>
    </Link>
  );
}