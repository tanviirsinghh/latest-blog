import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  TrendingUp, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Heart, 
  MessageCircle, 
  Bookmark,
  PenSquare
} from 'lucide-react';

export default function BoltLandingPage() {
  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development: What's Next in 2024",
      excerpt: "Exploring upcoming trends in web development including WebAssembly, Edge Computing, and the evolution of JavaScript frameworks.",
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      category: "Technology",
      readTime: "8 min",
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      title: "Building Scalable Applications with Modern Architecture",
      excerpt: "Learn the best practices for building scalable applications using modern architecture patterns and cloud services.",
      author: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      category: "Architecture",
      readTime: "10 min",
      likes: 156,
      comments: 23
    }
  ];

  const categories = [
    { name: "Technology", count: 128, icon: TrendingUp },
    { name: "Development", count: 85, icon: BookOpen },
    { name: "Community", count: 64, icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Where Great Ideas Find Their Voice
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of passionate writers and readers. Share your knowledge,
              discover new perspectives, and engage in meaningful conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/write"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                <PenSquare className="mr-2 h-5 w-5" />
                Start Writing
              </Link>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Stories</h2>
            <Link to="/blog" className="text-cyan-400 hover:text-cyan-300 flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map(post => (
              <article key={post.id} className="group">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-10 w-10 rounded-full ring-2 ring-cyan-500/20"
                      />
                      <div>
                        <p className="text-gray-300">{post.author.name}</p>
                        <p className="text-gray-500 text-sm">{post.readTime} read</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{post.excerpt}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-cyan-400 transition-colors">
                          <Heart className="h-5 w-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-cyan-400 transition-colors">
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <Bookmark className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Explore Topics
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map(category => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="group p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-cyan-500/10 rounded-xl">
                    <category.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <span className="text-gray-400">{category.count} articles</span>
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
                alt="CTA"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/50" />
            </div>
            
            <div className="relative py-16 px-8 md:py-24 md:px-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Share Your Story?
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Join our community of writers and readers. Share your knowledge,
                  connect with like-minded individuals, and make your voice heard.
                </p>
                <Link
                  to="/write"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  <PenSquare className="mr-2 h-5 w-5" />
                  Start Writing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}