import { Link } from 'react-router-dom'
import { BackgroundLines } from './ui/background-lines'
import { Book } from 'lucide-react'
import { AnimatedModal } from './Buttons/AnimatedModel'

export function BackgroundLinesDemo () {
  return (
    <BackgroundLines className='flex  items-center justify-center w-full flex-col px-4'>
      <h2 className='bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-500 to-neutral-300 dark:from-neutral-200 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight'>
        Welcome to <br />{' '}
        <span className='text text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500'>
          {' '}
          Large
        </span>
      </h2>
      <p className='max-w-xl mx-auto text-sm md:text-lg text-neutral-50 dark:text-neutral-50 text-center'>
        Your go-to platform for sharing and discovering unique stories,
        thoughts, and experiences.
      </p>
      <div className=' h-24 flex w-72  justify-between items-center'>
        <div className=''>
          <Link to='/blogs'>
            <button className='p-[3px] relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
              <div className='flex justify-between px-7 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent'>
                <Book /> Read
              </div>
            </button>
          </Link>
        </div>
        <div>
          <AnimatedModal />
        </div>
      </div>
    </BackgroundLines>
  )
}
