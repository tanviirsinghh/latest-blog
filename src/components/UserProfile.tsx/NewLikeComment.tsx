import React, { useState } from 'react'

// Mock data for user activities
const userActivities = {
  likes: [
    { id: 1, postTitle: "10 React Hooks You Should Know", author: "John Smith", date: "2024-03-15" },
    { id: 2, postTitle: "The Future of AI in Web Development", author: "Emily Johnson", date: "2024-03-14" },
    { id: 3, postTitle: "Mastering CSS Grid Layout", author: "Alex Lee", date: "2024-03-13" },
  ],
  comments: [
    { id: 1, postTitle: "Understanding TypeScript Generics", author: "Sarah Brown", comment: "Great article! Very informative.", date: "2024-03-15" },
    { id: 2, postTitle: "Building Scalable Node.js Applications", author: "Michael Chen", comment: "This helped me understand the concepts better.", date: "2024-03-14" },
    { id: 3, postTitle: "Responsive Design Best Practices", author: "Laura Martinez", comment: "Could you elaborate more on mobile-first approach?", date: "2024-03-13" },
  ],
}

const NewLikeComments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'likes' | 'comments'>('likes')

  const renderLikes = () => (
    <ul className="space-y-4">
      {userActivities.likes.map(like => (
        <li key={like.id} className="bg-white rounded-lg shadow p-4 flex items-start">
          <div className="text-2xl mr-4">👍</div>
          <div>
            <h3 className="font-semibold text-lg">{like.postTitle}</h3>
            <p className="text-sm text-gray-600">by {like.author} • {like.date}</p>
          </div>
        </li>
      ))}
    </ul>
  )

  const renderComments = () => (
    <ul className="space-y-4">
      {userActivities.comments.map(comment => (
        <li key={comment.id} className="bg-white rounded-lg shadow p-4 flex items-start">
          <div className="text-2xl mr-4">💬</div>
          <div>
            <h3 className="font-semibold text-lg">{comment.postTitle}</h3>
            <p className="text-sm text-gray-600">by {comment.author} • {comment.date}</p>
            <p className="mt-2 text-gray-700">{comment.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Activity</h2>
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            activeTab === 'likes' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('likes')}
        >
          Likes
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            activeTab === 'comments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('comments')}
        >
          Comments
        </button>
      </div>
      <div className="mt-4">
        {activeTab === 'likes' ? renderLikes() : renderComments()}
      </div>
    </div>
  )
}

export default NewLikeComments