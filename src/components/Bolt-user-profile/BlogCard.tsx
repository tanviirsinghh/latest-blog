import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  readTime: string;
  likes: number;
  comments: number;
  tags: string[];
}

export function BlogCard({
  title,
  excerpt,
  author,
  coverImage,
  readTime,
  likes,
  comments,
  tags,
}: BlogCardProps) {
  return (
    <article className="glass-card rounded-xl overflow-hidden hover:glow">
      <div className="relative">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-10 w-10 rounded-full ring-2 ring-primary/30"
          />
          <div>
            <h3 className="font-medium text-gray-100">{author.name}</h3>
            <p className="text-sm text-gray-400">{readTime} read</p>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-100 mb-2 hover:text-primary transition-colors cursor-pointer">
          {title}
        </h2>
        <p className="text-gray-400 mb-4">{excerpt}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm glass-effect text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span>{comments}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          <button className="text-gray-400 hover:text-primary transition-colors">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}