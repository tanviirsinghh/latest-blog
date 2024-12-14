import { Home, Bookmark, TrendingUp, Users, Tag, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Home', icon: Home },
  { name: 'Trending', icon: TrendingUp },
  { name: 'Following', icon: Users },
  { name: 'Bookmarks', icon: Bookmark },
  { name: 'Tags', icon: Tag },
];

export function LeftBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Icon for small screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md text-gray-300 hover:bg-white/20"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={` pt-24 fixed top-0 left-0 h-full w-64 bg-gray-900 glass-effect border-r border-white/10 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-40`}
      >
        <div className="p-4 ">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 rounded-lg hover:bg-white/10 hover:text-primary transition-colors">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto p-4 border-t border-white/10">
          <div className="glass-card rounded-lg p-4 neon-border">
            <h3 className="font-semibold text-primary">Write a Blog</h3>
            <p className="text-sm text-gray-400 mt-1">Share your thoughts with the community</p>
            <button className="mt-3 w-full bg-primary hover:bg-primary-dark text-dark px-4 py-2 rounded-lg transition-colors font-medium">
              Start Writing
            </button>
          </div>

          <button className="mt-4 w-full flex items-center space-x-3 px-4 py-2 text-gray-300 rounded-lg hover:bg-white/10 hover:text-primary transition-colors">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Backdrop for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
