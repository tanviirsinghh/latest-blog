
import Navbar from '../components/Navbar';

const blogPosts = [
  { id: 1, title: '15 Libraries You Should Know if You Build with React', author: 'Khushi_developer', description: 'Introduction to React', date: 'Apr 11', readTime: '5 min read' },
  { id: 2, title: 'React 19: Goodbye to Old Features, Hello to the Future', author: 'Adhithi Ravichandran', description: 'React 19 is shaping up to be an important update, enhancing the performance and developer experience introduced in React 18.', date: 'Sep 26', readTime: '7 min read' },
  { id: 3, title: 'Why do people who "dont play games" play Wordle?', author: 'Sam Liberty', description: 'Exploring the phenomenon of Wordles widespread appeal', date: 'Oct 1', readTime: '4 min read' },
]

export default function Home() {

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
            <div className="space-y-6">
              {blogPosts.map((post) => (
                <div key={post.id} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-2">{post.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span className="mx-2">·</span>
                    <span>{post.date}</span>
                    <span className="mx-2">·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Staff Picks</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold">How to make your weekends feel twice as long</h3>
                <p className="text-sm text-gray-600">The Medium Newsletter in The Medium Blog</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold">Everyone Needs to Try Fresh Figs At Least Once</h3>
                <p className="text-sm text-gray-600">Evin Ibrahim in Sharing Food</p>
              </div>
              <div>
                <h3 className="font-semibold">Why do people who "don't play games" play Wordle?</h3>
                <p className="text-sm text-gray-600">Sam Liberty in Bootcamp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}