import { Link } from 'react-router-dom'
import { BackgroundLinesDemo } from '../components/BackgroundLinesDemo'
import { MarqueeDemo } from '../components/MarqueeDemo'
import Features from '../components/Features'
import Footer from '../components/Footer'
import { PenSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { OrbitProgress } from 'react-loading-indicators'

export default function BoltLandingPage () {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or fetch data
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if(loading){
    return <div>
       <div className='h-screen bg-black w-full flex justify-center items-center'>
    <OrbitProgress variant="spokes" color="#4a45f0" size="medium" text="" textColor="" />
  </div>
    </div>
  }
  return (
    <>
      <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <BackgroundLinesDemo />
        <Features />
        <section className='bg-white'>
          <MarqueeDemo />
        </section>
        {/* CTA Section */}
        <section className='py-20 bg-black'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='relative rounded-2xl overflow-hidden'>
              <div className='absolute inset-0'>
                <img
                  src='https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
                  alt='CTA'
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/50' />
              </div>

              <div className='relative py-16 px-8 md:py-24 md:px-12'>
                <div className='max-w-2xl'>
                  <h2 className='text-3xl md:text-4xl font-bold text-gray-300 mb-6'>
                    Ready to Share Your Story?
                  </h2>
                  <p className='text-lg text-gray-300 mb-8'>
                    Join our community of writers and readers. Share your
                    knowledge, connect with like-minded individuals, and make
                    your voice heard.
                  </p>
                  <Link
                    to='/publish'
                    className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300'
                  >
                    <PenSquare className='mr-2 h-5 w-5' />
                    Start Writing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}
