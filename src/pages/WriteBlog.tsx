import {  useRef, useState } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Bolt-user-profile/Navbar'
import { toast } from 'react-toastify'
import ImageUpload from '../components/ImageUpload'
import ImageUploadHook from '../hooks/ImageUploadHook'
import Footer from '../components/Footer';
import { OrbitProgress } from 'react-loading-indicators'


//  we are using this
export default function TextEditor () {
  const editorRef = useRef<TinyMCEEditor | null>(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')
  if(!token){
    toast.info('Log In or Create Account First')
     navigate('/publish')
  }
   
  const [title, setTitle] = useState('')
  const [descript, setDescript] = useState('')
  const [img, setImg] = useState<File | null>(null)

  const getImgFile = (file: File | null) => {
    setImg(file)
  }

  const SendPost = async () => {
    setLoading(true)
    if (!title && !descript) {
      toast.error('Title and Description cannot be empty')
      setLoading(false)
      return
    }
    // uploading the img to the cloudinary server

    // Append if file is not null

    try {
      const imgUrl = img ? await ImageUploadHook(img) : '';
      if (!imgUrl && img) {
        // If image is present but upload failed
        toast.error('Image upload failed. Cannot proceed.');
        return;
      }
      await sendData(imgUrl || ''); // Handle empty URLs gracefully
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
    // if (img) {
    //   console.log(' image selected')

    //   const data = new FormData()
    //   data.append('file', img)
    //   data.append('upload_preset', 'Blog-Project')
    //   data.append('cloud_name', 'dktr9buob')
    //   console.log('start request')
    //   try {
    //     const response = await axios.post(`${CLOUDINARY_URL}`, data, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     })
    //     console.log(response.data.secure_url)
    //     console.log('complete')
    //     const imgUrl = response.data.secure_url
    //     // setUrl(imgUrl)

    //     await sendData(imgUrl)
    //   } catch (e) {
    //     toast.error('Error Occurred / Please Re-Upload')
    //     return Response.json({
    //       msg: "Image didn't upload"
    //     })
    //   }
    // } else {
    //   await sendData('')
    // }
  }
  const sendData = async (imgUrl: string) => {
    try {
      
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: descript,
          url: imgUrl || ' '
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      )
      toast.success('Blog Posted Successfully')
      setLoading(false)
      navigate(`/blog/${response.data.id}`)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 500:
            toast.error('Please try again / Internal Server Error')
            setLoading(false)

            break
          case 411:
            toast.error('Input Not Correct')
            setLoading(false)

            break
          default:
            toast.error('An unexpected error occurred')
            setLoading(false)

        }
      }
    }
  }

if(loading){
  return( 
  <div className='h-screen w-full flex justify-center items-center'>
    <OrbitProgress variant="spokes" color="#3e43ef" size="medium" text="" textColor="" />
  </div>)
}
  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };rre

  return (
    <>
    <div className='h-full w-full  flex-col justify-center items-center bg-black'>
      <Navbar />
      <div className='h-24'></div>
      <div className='w-full h-44 flex justify-center  bg-black '>
        {/* <div className='bg-violet-500 w-2/4 h-full flex justify-center items-center'> */}
       
          <ImageUpload getImgFile={getImgFile} />
        {/* </div> */}
      </div>
      <div className='flex justify-center items-center h-32 w-full px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-5xl'>
      <input
            onChange={e => {
              setTitle(e.target.value)
            }}
            type='text'
            // className='bg-black border border-gray-300 text-gray-300 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            autoFocus 
            className="w-full bg-transparent text-4xl font-bold text-gray-300  placeholder-gray-300  bg-black focus:outline-none focus:ring-0"
            placeholder='Title'
          />
        </div>
      </div>
      <div className='  flex justify-center items-center  px-4 sm:px-6 lg:px-8 '>
        <Editor
          apiKey='s73wk7i6fwr11ew23vudqfd79tjyajof2inq6b6qg8a9c9x6
'
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            width: '70%', //changed from 1000
            menubar: true,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount'
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
             'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #000000 !important; color: #ffffff !important; } .mce-content-body { background-color: #000000 !important; } .tox-menubar { background-color: #000000 !important; } .tox-toolbar { background-color: #000000 !important; } .tox-toolbar__primary { background-color: #000000 !important; } .tox-menubar button { color: #ffffff !important; }',
            skin: "oxide-dark",
    content_css: "dark",
     toolbar_bg: "#000000",
    toolbar_text_color: "#ffffff"
          }}
          onEditorChange={content => setDescript(content)} // Update state on change
        />
      </div>
      <div className='w-full h-inherit  flex justify-center items-end h-32 '>
        {/* <button
          onClick={SendPost}
          type='submit'
          className=' inline-flex items-center px-7 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
        >
          Publish Post
        </button> */}
        <button  onClick={SendPost}
          type='submit' className="px-5 py-2.5 relative rounded group  text-white font-medium inline-block">
    <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
    <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
    <span className="relative">Publish Post</span>
</button>
      </div>
    
    </div>
    <div className='h-96  bg-black'>
      <div className='h-36'></div>
     < Footer/>
     
  </div>
     </>
  )
}
