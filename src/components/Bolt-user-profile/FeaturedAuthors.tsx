import React from 'react'
import { Award } from 'lucide-react'
// import { featuredAuthors } from '../../data/authors';
import { featuredAuthors } from '../../lib/author'

export function FeaturedAuthors () {
  return (
    <div className='glass-card rounded-xl p-6 neon-border'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center space-x-2'>
          <Award className='h-5 w-5 text-primary' />
          <h2 className='text-lg font-semibold'>Featured Authors</h2>
        </div>
        <button className='text-sm text-primary hover:text-primary-dark'>
          View All
        </button>
      </div>

      <div className='space-y-4'>
        {featuredAuthors.map((author, index) => (
          <div
            key={index}
            className='flex items-center space-x-4 p-3 rounded-lg glass-effect hover:bg-white/20 transition-all duration-300'
          >
            <img
              src={author.avatar}
              alt={author.name}
              className='h-12 w-12 rounded-full ring-2 ring-primary/30'
            />
            <div className='flex-1'>
              <h3 className='font-medium text-gray-100'>{author.name}</h3>
              <p className='text-sm text-gray-400'>{author.role}</p>
            </div>
            <div className='text-right'>
              <div className='text-sm font-medium text-gray-100'>
                {author.posts} posts
              </div>
              <div className='text-xs text-primary'>
                {author.followers} followers
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
