
import { TrendingUp, ChevronRight } from 'lucide-react';
// import { trendingTopics } from '../../data/topics';
import { trendingTopics } from '../../lib/topic';

export function TrendingTopics() {
  return (
    <div className="glass-card rounded-xl p-6 neon-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Trending Topics</h2>
        </div>
        <button className="text-sm text-primary hover:text-primary-dark">View All</button>
      </div>
      
      <div className="space-y-3">
        {trendingTopics.map((topic, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer glass-effect hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center space-x-2">
              <span className="text-gray-100">#{topic.name}</span>
              <span className="text-xs text-primary">{topic.growth}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{topic.posts} posts</span>
              <ChevronRight className="h-4 w-4 text-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}