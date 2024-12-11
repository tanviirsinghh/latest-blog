import React, { useState } from 'react'
import {  Twitter, Linkedin, GitlabIcon as GitHub } from 'lucide-react';



// pass the user name also with respective blog data
export default function UserInfoSide() {




































































  
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Passionate writer and tech enthusiast. I love exploring new technologies and sharing my insights with the world.',
        avatar: '/placeholder.svg?height=150&width=150',
        socialLinks: {
          twitter: 'https://twitter.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe',
          github: 'https://github.com/johndoe',
        },
      });
  return (
    // <div className="max-w-7xl mx-auto px-4 py-8 font-sans">

      
        <div className="lg:w-1/3 space-y-8">
          User Profile
          <div className="bg-gray-100 rounded-lg p-6">
            <img src={user.avatar} alt="{blog.authorName}" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-center mb-2">{user.name}</h2>
            <p className="text-gray-600 text-center mb-4">{user.email}</p>
            <p className="text-gray-800 mb-6">{user.bio}</p>
            <div className="flex justify-center space-x-4 mb-6">
              <a href={user.socialLinks.twitter} className="text-blue-400 hover:text-blue-600" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href={user.socialLinks.linkedin} className="text-blue-700 hover:text-blue-900" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={user.socialLinks.github} className="text-gray-800 hover:text-gray-600" aria-label="GitHub">
                <GitHub className="w-6 h-6" />
              </a>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Follow
            </button>
          </div>

         
        </div>
      // </div> 


    
  )
}
