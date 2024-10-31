import React, { useState } from 'react'
import {  ThumbsUpIcon, MessageCircleIcon } from 'lucide-react'

export default function MyActivities() {
    const userActivities = {
        likes: [
          { id: 1, title: "The Art of Clean Code", author: "Robert C. Martin" },
          { id: 2, title: "JavaScript: The Good Parts", author: "Douglas Crockford" },
        ],
        comments: [
          { id: 1, title: "Python for Data Science", author: "Jake VanderPlas", comment: "Great article! Very informative." },
          { id: 2, title: "Machine Learning Basics", author: "Andrew Ng", comment: "This helped me understand the concepts better." },
        ]
      }
      
      // Mock data for recent activities on user's posts
      const recentActivities = {
        likes: [
          { id: 1, title: "Your Guide to React Hooks", user: "Alice Johnson" },
          { id: 2, title: "Understanding Async/Await", user: "Bob Williams" },
        ],
        comments: [
          { id: 1, title: "Your Guide to React Hooks", user: "Charlie Brown", comment: "This was exactly what I needed. Thanks!" },
          { id: 2, title: "Understanding Async/Await", user: "Diana Smith", comment: "Could you elaborate more on error handling?" },
        ]
      }
      const [showUserActivities, setShowUserActivities] = useState(true)
      const [showLikes, setShowLikes] = useState(true)      
  return (
    <div>
     <div className="mt-6 bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Activities</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show:</span>
            <button
              className={`px-3 py-1 text-sm rounded-full ${showUserActivities ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setShowUserActivities(true)}
            >
              My Activities
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${!showUserActivities ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setShowUserActivities(false)}
            >
              Recent Activities
            </button>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 text-sm rounded-l-full ${showLikes ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setShowLikes(true)}
          >
            Likes
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-r-full ${!showLikes ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setShowLikes(false)}
          >
            Comments
          </button>
        </div>
        <div>
          {showLikes ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Likes</h3>
              <ul className="space-y-2">
                {(showUserActivities ? userActivities.likes : recentActivities.likes).map(like => (
                  <li key={like.id} className="flex items-start space-x-2">
                    <ThumbsUpIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{like.title}</p>
                      <p className="text-sm text-gray-500">
                        {/* {showUserActivities ? `by ${like.author}` : `liked by ${like.user}`} */}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <ul className="space-y-2">
                {(showUserActivities ? userActivities.comments : recentActivities.comments).map(comment => (
                  <li key={comment.id} className="flex items-start space-x-2">
                    <MessageCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{comment.title}</p>
                      <p className="text-sm text-gray-500">
                        {/* {showUserActivities ? `by ${comment.author}` : `commented by ${comment.user}`} */}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
