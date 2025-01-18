import { useBlog } from '../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Bolt-user-profile/Navbar'
import BoltFullBlog from '../components/Bolt-user-profile/BoltFullBlog'
import Loading from '../components/Loading'

export default function Blog () {
  const navigate = useNavigate()

  const { id } = useParams()
  const { loading, blog, editButton } = useBlog({
    id: id || ''
  })
  if (!localStorage.getItem('token')) {
    navigate('/signin')
    return
  }
  if (loading) {
    return (
      <div>
        <Loading />{' '}
      </div>
    )
  }
  if (loading || !blog) {
    return (
      <div>
        <Navbar />
        <div className='h-screen flex flex-col justify-center'>
          <div className='flex justify-center'>
            <Loading />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      {/* <FullBlog blog={blog!} /> */}
      {/*  in blog! we are telling the typescript that blog object is not null, trust me and render, */}
      {/* <NewFullBlog blog={blog!}/> */}
      {blog && <BoltFullBlog blog={blog!} editButton={editButton ?? false} />}
    </div>
  )
}
