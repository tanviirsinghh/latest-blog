
import formatTimestamp from '../hooks/index';
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";



 interface Comments {
    id:    string
    content: string
    timestamp: string
    user:{
      name:string,
      profilePicture:string,
      id:string
    }
  }
  
export default function Comments({id, content, timestamp, user}: Comments ) {
  
  return (
    <div>
        
      <div key={id} className='flex space-x-4'>
      <Link to={`/authorprofile?authorId=${user.id}`}>

                      <img
                        src={user.profilePicture}
                        alt={`${user.name}'s avatar`}
                        className='w-10 h-10 rounded-full'
                      />
                        </Link>
        
                      <div className='flex-1'>
                        <div className='text-white bg-gray-800 shadow-md p-4 rounded-lg'>
                          <div className='flex items-center justify-between mb-2'>
                            <div>
                            <Link to={`/authorprofile?authorId=${user.id}`}>

                              <h4 className='font-semibold hover:cursor-pointer text-blue-700'>
                                {user.name}
                              </h4>
                              </Link>
                              <p className='text-white text-sm'>
                                {formatTimestamp(timestamp)}
                              </p>
                            </div>
                            <button className='text-gray-400 hover:text-gray-600'>
                              <MoreVertical className='w-4 h-4' />
                            </button>
                          </div>
                          <p>{content}</p>
                        </div>
                        {/* <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <button className="hover:text-blue-500">Reply</button>
                          <button className="hover:text-blue-500">Like</button>
                        </div> */}
                      </div>
                    </div>
    </div>
   
  )
}
