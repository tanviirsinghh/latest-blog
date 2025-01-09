// import { LeftBar } from '../components/Bolt-user-profile/LeftBar'
import { CheckCircle2 } from 'lucide-react';
import { BlogList } from '../components/Bolt-user-profile/BlogList'
import Navbar from '../components/Bolt-user-profile/Navbar'
import { CardSpotlightDemo } from '../components/CardSpotLight';

export default function BoltMainPage () {
  return (
    <>
      <div className='min-h-screen bg-black'>
        {/* <div className='w-full h-16 '> */}
        <Navbar />
        {/* </div> */}
        {/* <LeftBar /> */}

        <main className=' lg: pt-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className=' grid grid-cols-1 lg:grid-cols-3 gap-8 '>
            <div className='lg:col-span-2 border border-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.15)] bg-black/40'> 
                         <BlogList />
              </div>
              <div className='space-y-8 sticky '>
               <CardSpotlightDemo/>
               <div>
               <div className='bg-gradient-to-br from-indigo-500 to-purple-600 rounded-sm shadow-lg p-6 text-white'>
                <h2 className='text-lg font-semibold mb-4'>
                 Read What You Like
                </h2>
                <ul className='space-y-3 text-sm'>
                  <li className='flex items-center'>
                    <CheckCircle2 className='w-4 h-4 mr-2' />
                    Blogs from your favourite Author
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle2 className='w-4 h-4 mr-2' />
                    Find Like Minded People
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle2 className='w-4 h-4 mr-2' />
                    Community to Engage with.
                  </li>
                </ul>
              </div>
               </div>
              </div>
             
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
