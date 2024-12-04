import { useRef, useState } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import ImageUpload from '../components/ImageUpload'
import ImageUploadHook from '../hooks/ImageUploadHook'


//  we are using this
export default function TextEditor () {
  const editorRef = useRef<TinyMCEEditor | null>(null)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [descript, setDescript] = useState('')
  const [img, setImg] = useState<File | null>(null)

  const getImgFile = (file: File | null) => {
    setImg(file)
  }

  const SendPost = async () => {
    if (!title && !descript) {
      toast.error('Title and Description cannot be empty')
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
      console.log('entered request frontend with url, title, description')
      console.log('here is the url ' + imgUrl)
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
      navigate(`/blog/${response.data.id}`)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 500:
            toast.error('Please try again / Internal Server Error')
            break
          case 411:
            toast.error('Input Not Correct')
            break
          default:
            toast.error('An unexpected error occurred')
        }
      }
    }
  }

  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };rre

  return (
    <div className='h-screen w-full  flex-col justify-center items-center'>
      <Navbar />
      <div className='w-full h-44  flex justify-center  '>
        {/* <div className='bg-violet-500 w-2/4 h-full flex justify-center items-center'> */}
          <ImageUpload getImgFile={getImgFile} />
        {/* </div> */}
      </div>
      <div className='flex   justify-center items-center h-32 w-full  '>
        <div className='  max-w-screen-lg h-16 w-2/3 flex'>
          <input
            onChange={e => {
              setTitle(e.target.value)
            }}
            type='text'
            className=' border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Title'
          />
        </div>
      </div>
      <div className='  flex justify-center items-center h-3/ w-full '>
        <Editor
          apiKey='s73wk7i6fwr11ew23vudqfd79tjyajof2inq6b6qg8a9c9x6
'
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            width: 1000,
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
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
          onEditorChange={content => setDescript(content)} // Update state on change
        />
      </div>
      <div className='w-full h-inherit  flex justify-center items-center h-24 '>
        <button
          onClick={SendPost}
          type='submit'
          className=' inline-flex items-center px-7 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
        >
          Publish Post
        </button>
      </div>
    </div>
  )
}
