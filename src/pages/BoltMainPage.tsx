import { CheckCircle2 } from 'lucide-react';
import { BlogList } from '../components/user-profile/BlogList'
import Navbar from '../components/user-profile/Navbar'
import { CardSpotlightDemo } from '../components/CardSpotLight';
import Footer from '../components/Footer';

export default function BoltMainPage() {
  return (
    <>
      <div className='min-h-screen bg-black'>
        <Navbar />

        <main className='pt-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Left side - Blog List */}
              <div className='lg:col-span-2 border border-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.15)] bg-black/40'> 
                <BlogList />
              </div>

              {/* Right side - Sticky Sidebar */}
              <aside className=' lg:col-span-1'>
                <div className='sticky top-32 space-y-8'>
                 

                  <CardSpotlightDemo/>
                  
                  <div className='w-full text-center  sm:w-full md:w-full lg:w-full xl:w-96  bg-gradient-to-br from-indigo-500 to-purple-600 rounded-sm shadow-lg p-6 text-white'>
                    <h2 className=' text-2xl font-semibold mb-4 font-sans '>
                      Read What You Like
                    </h2>
                    <ul className='space-y-3 text-sm'>
                      <li className='flex items-center justify-center text-lg font-sans'>
                        <CheckCircle2 className='w-4 h-4 mr-2' />
                        Blogs from your favourite Author
                      </li>
                      <li className='flex items-center justify-center text-lg font-mono'>
                        <CheckCircle2 className='w-4 h-4 mr-2' />
                        Find Like Minded People
                      </li>
                      <li className='flex items-center justify-center text-lg font-mono'>
                        <CheckCircle2 className='w-4 h-4 mr-2' />
                        Community to Engage with.
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
        <div className='h-18 '>kjgk</div>
        <Footer/>
      </div>
    </>
  )
}