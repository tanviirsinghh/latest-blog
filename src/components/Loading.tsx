import { Slab } from 'react-loading-indicators'

export default function Loading() {
  return (
    <div className='flex h-screen w-full justify-center items-center'>
      <Slab color="#3164cc" size="large" text="" textColor="#f2f2f2" />
    </div>
  )
}
