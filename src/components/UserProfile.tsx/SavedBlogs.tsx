import React from 'react'
import { BookmarkIcon } from 'lucide-react'

export default function SavedBlogs() {
  return (
    <div>
      <div className="h-96 w-[33rem] shadow-lg rounded-lg p-2 flex flex-col justify-evenly items-start">
        <div className='h-8 w-full  flex justify-center items-center'>
          <h2 className="text-xl font-semibold mb-4">Saved Blogs</h2>
          </div>
          <div className="h-[350px] p-2 w-full  overflow-y-auto pr-2">
            <ul className="space-y-4">
             
                <li  className="flex items-start space-x-2">
                  <BookmarkIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium"> ki haal ae</p>
                    <p className="text-sm text-gray-500">by ustaad lokk</p>
                  </div>
                </li>
             
            </ul>
          </div>
        </div>
    </div>
  )
}
