import { Link } from 'react-router-dom'
// import { AnimatedModal } from '../components/Buttons/AnimatedModel';
import { BackgroundLinesDemo } from '../components/BackgroundLinesDemo'
// import SectionMain from '../components/SectionMain';
import { MarqueeDemo } from '../components/MarqueeDemo'
// import { DotPatternDemo } from '../components/DotPatternDemo';
import Features from '../components/Features'
import Footer from '../components/Footer';
import {
 
  PenSquare
  // Book
} from 'lucide-react'

export default function BoltLandingPage () {
 


  return (
    <>
      <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <BackgroundLinesDemo />
        {/* Hero Section */}

        {/* <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Where Great Ideas Find Their Voice
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of passionate writers and readers. Share your knowledge,
              discover new perspectives, and engage in meaningful conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
            <Link
                to="/blogs"
                className="h-10  inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                <Book className="mr-2 h-5 w-5" />
                  Read
              </Link>
              <div className="relative">
              
              <Link
                to="/publish"
                className=" h-11 inline-flex items-center px-0 py-3 "

              >
               <AnimatedModal/>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}

        {/* Featured Posts */}
        {/* <SectionMain/> */}
        <Features />

        <section className='bg-white'>
          <MarqueeDemo />
          {/* <DotPatternDemo/> */}
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
                    to='/write'
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
      <Footer/>
      </div>
    </>
  )
}
