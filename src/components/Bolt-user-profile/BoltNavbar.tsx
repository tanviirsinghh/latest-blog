import { Menu, Search, Bell, PenSquare } from 'lucide-react'

export function BoltNavbar () {
  return (
    <nav className='fixed top-0 left-0 right-0 glass-effect border-b border-white/10 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <button className='p-2 rounded-lg hover:bg-white/10 lg:hidden'>
              <Menu className='h-6 w-6' />
            </button>
            <div className='ml-4 text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent'>
              DevBlog
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search...'
                className='w-64 px-4 py-2 rounded-full glass-effect text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary'
              />
              <Search className='absolute right-3 top-2.5 h-5 w-5 text-gray-400' />
            </div>

            <button className='flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-dark rounded-lg transition-colors'>
              <PenSquare className='h-5 w-5' />
              <span>Write</span>
            </button>

            <button className='p-2 rounded-full hover:bg-white/10 relative'>
              <Bell className='h-6 w-6' />
              <span className='absolute top-0 right-0 h-2 w-2 bg-primary rounded-full'></span>
            </button>

            <img
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              alt='Profile'
              className='h-8 w-8 rounded-full cursor-pointer ring-2 ring-primary/30'
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
