
export default function BoltNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-cyan-500">DevBlog</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-cyan-500 transition-colors">
              Dashboard
            </button>
            <button className="text-gray-300 hover:text-cyan-500 transition-colors">
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}