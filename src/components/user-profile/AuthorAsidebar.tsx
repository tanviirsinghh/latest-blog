// import { Twitter, Linkedin, Globe, Mail } from 'lucide-react'
import { useUserDetails } from '../../hooks'
import { TrophySpin } from 'react-loading-indicators'
import { Link } from 'react-router-dom';
import { ScriptCopyBtnDemo } from '../ScriptCopyBtnDemo';
interface AuthorAsidebarProps {
  authorId: string
}

export default function AuthorAsidebar ({ authorId }: AuthorAsidebarProps) {
  const { userDetails } = useUserDetails(authorId)
  if (!userDetails) {
    return (
      <aside className='lg:col-span-1'>
        <div className='sticky top-44 bg-gray-900 rounded-lg shadow-lg p-6 '>
          <div className='flex justify-center items-normal'>
            <TrophySpin
              color='#3164cc'
              size='medium'
              text=''
              textColor='#f2f2f2'
            />
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className='lg:col-span-1 '>
      <div
        className='bg-black sticky top-44 rounded-lg p-6 
         
        border border-gray-800
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        
        space-y-6'
      >
        <div className='text-center'>
          <img
            src={userDetails.profilePicture}
            alt={userDetails.name}
            className='w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500 hover:border-indigo-400 transition-colors duration-300'
          />
      <Link to={`/authorprofile?authorId=${authorId}`}>
      <h2 className='font-mono text-2xl text-gray-100 font-bold hover:text-blue-500 cursor-pointer transition-all'>
            {userDetails.name}
          </h2>
          </Link>
          <p className='font-mono text-indigo-300 font-medium'><span className='text-bold font-sans text-gray-300'>Blog Name : </span>{userDetails.blogName}</p>
        </div>

        <div className='flex font-mono text-gray-300 text-center'>
         <span className='font-sans font-bold text-gray-300 mr-2'>BIO : </span> <p>{userDetails.bio}</p>
        </div>

        <div>
          <h3 className='font-semibold mb-3 text-gray-100 font-mono'>Recent Posts: </h3>
          <ul className='space-y-2 '>
          
            {userDetails.posts.map((post, index) => (
              <li
                key={index}
                className='h-11 flex items-center bg-gradient-to-r from-indigo-500 to-indigo-700 rounded p-2 hover:bg-gray-700 transition-colors duration-200'
              >
                  
                <img className="h-9" src="/src/assets/book.png" alt="" />
                <Link  to={`/blog/${post.id}`}>
                <a
                  href='#'
                  className='font-mono text-sm ml-1 text-gray-300 hover:text-indigo-800 transition-all'
                >
                  {post.title.slice(0,23) + "..."}
                </a>
                </Link>
              </li>
            ))}
          </ul>
         
        </div>
        

        <div className='border-t border-gray-700 pt-4'>
          <h3 className='font-semibold mb-3 text-indigo-500 font-sans text-bold text-lg'>E-mail Author :  </h3>
         <ScriptCopyBtnDemo email={userDetails.email}/>
          </div>
      </div>
    </aside>
  )

}
