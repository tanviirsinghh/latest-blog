
import formatTimestamp from '../hooks/index';
import { Link } from "react-router-dom";

//using

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
        
      <div key={id} className='flex space-x-4 '>
      <Link to={`/authorprofile?authorId=${user.id}`}>

                      <img
                        src={user.profilePicture}
                        alt={`${user.name}'s avatar`}
                        className='w-10 h-10 rounded-full'
                      />
                        </Link>
        
                      <div className='flex-1'>
                        <div className='text-white bg-black  p-4 rounded-lg border border-gray-800
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]'>
                          <div className='flex items-center justify-between mb-2'>
                            <div>
                            <Link to={`/authorprofile?authorId=${user.id}`}>

                              <h4 className='font-bold font-mono text-base hover:cursor-pointer text-indigo-500'>
                                {user.name}
                              </h4>
                              </Link>
                              <p className='text-gray-300 text-sm'>
                                {formatTimestamp(timestamp)}
                              </p>
                            </div>
                           
                          </div>
                          <p className='font-bold font-mono text-base text-gray-300'>{content}</p>
                        </div>
                        
                      </div>
                    </div>
    </div>
   
  )
}
