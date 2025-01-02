import { ArrowUp } from 'lucide-react'
import { DockDemo } from './DockDemo'

export default function Footer () {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='bg-black text-gray-300'>
      <div className='container mx-auto px-4 py-8'>
        <div className='relative'>
          <div className='absolute left-1/2 transform -translate-x-1/2 -top-14'>
            <button
              onClick={scrollToTop}
              className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg transition-colors duration-300'
              aria-label='Scroll to top'
            >
              <ArrowUp size={24} />
            </button>
          </div>
        </div>

        <div className='flex justify-center h-24  items-center pb-9'>
          <DockDemo />
        </div>

        <div className='text-center'>
          <p className='text-sm mb-2 '>
            &copy; 2024{' '}
            <span className=' font-bold text text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500'>
              Large.
            </span>{' '}
            All rights reserved.
          </p>
          <p className='text-xs text-gray-500'>
            Designed with <span className='text-red-500'>&hearts; </span> by{' '}
            <a
              href='www.instagram.com/tanviirsinghh'
              target='_blank'
              className='text-indigo-400 hover:underline'
            >
              Tanvir Singh
            </a>
          </p>
        </div>
      </div>

      <div className='bg-black '>
        <div className='text-xs font-bold font-mono text-center text text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-800'>
          <p>FUCK OFF, GO TO HELL. MAI INDUSTRY DA BANDA NI !!</p>
        </div>
      </div>
    </footer>
  )
}
