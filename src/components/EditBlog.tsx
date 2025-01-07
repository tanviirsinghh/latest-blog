import React, { useState, useRef } from 'react'
import {
  Send,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  BookOpen,
  ImagePlus,
  X
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEditor } from 'tinymce'
import ImageUploadHook from '../hooks/ImageUploadHook'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BACKEND_URL } from '../config'
import { FourSquare } from 'react-loading-indicators'
import DOMPurify from 'dompurify'
import Navbar from './Bolt-user-profile/Navbar';
import Footer from './Footer';

function EditBlog () {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
  const [showTips, setShowTips] = useState(true)
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const { blog } = location.state
  const [title, setTitle] = useState(blog.title)
  const [description, setDescription] = useState(blog.content)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  )
  const editorRef = useRef<TinyMCEEditor | null>(null)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
      const newPreviewURL = URL.createObjectURL(file)
      setImagePreview(newPreviewURL)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    SendPost()
  }

  const SendPost = async () => {
    setLoading(true)
    if (!title && !description) {
      toast.error('Title and Description cannot be empty')
      setLoading(false)
      return
    }

    try {
      const imgUrl = image ? await ImageUploadHook(image) : ''
      if (!imgUrl && image) {
        toast.error('Image upload failed. Cannot proceed.')
        setLoading(false)
        return
      }
      await sendData(imgUrl || '')
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      toast.error('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  const sendData = async (imgUrl: string) => {
    console.log(blog.id)
    console.log('frontend api hit sendData' + imgUrl)
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog/editedblog/${blog.id}`,
        {
          title: title,
          content: description,
          id: blog.id,
          url: imgUrl || blog.url || " "
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      )
      if(response && response.data){
        toast.success('Blog Edited Successfully')
        setLoading(false)
        navigate(`/blog/${response.data.id}`)
      }
     
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 500:
            toast.error('Token not Verified / Internal Server Error')
            break
          case 411:
            toast.error('Input Not Correct')
            break
          default:
            toast.error('Server Error')
        }
      }
      setLoading(false)
    }
  }
  
  const deleteBlog = async () => {
    setLoading(true)
    console.log()
    try {
      console.log("delete blog di id")
      console.log(blog.id)
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/blog/deleteblog/${blog.id}`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      )
      if(response && response.data){
        toast.success('Blog Deleted Successfully')
        setLoading(false)
        
          navigate('/blogs') // Navigate to the blog list page
     
      }
     
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            toast.error('Token not Found ')
            break
            case 400:
            toast.error('Blog Id incorrect')
            break
          case 411:
            toast.error('Token Not verified')
            break
            case 500:
              toast.error('Internal Server Error')
              break
          default:
            toast.error('Server Error')
        }
      }
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <FourSquare color='#2468f4' size='medium' text='' textColor='' />
      </div>
    )
  }

  return (
    
    <div className='min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8'>
      <Navbar/>
      <div className='h-16'></div>
      <div className='max-w-5xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-300 mb-4'>
            Create Your Story
          </h1>
          <p className='text-lg text-gray-300'>
            Share your thoughts and inspire others
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <div className='from-gray-950 via-slate-950 to-slate-00 rounded-2xl shadow-slate-950 shadow-2xl overflow-hidden'>
              <div className='flex border-b border-gray-300'>
                <button
                  onClick={() => setActiveTab('write')}
                  className={`flex-1 py-4 px-6 text-center ${
                    activeTab === 'write'
                      ? 'border-b-2 border-purple-500 text-purple-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Write
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 py-4 px-6 text-center ${
                    activeTab === 'preview'
                      ? 'border-b-2 border-purple-500 text-purple-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Preview
                </button>
              </div>

              {activeTab === 'write' ? (
                <form onSubmit={handleSubmit} className='p-6 space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-1'>
                      Cover Image
                    </label>
                    <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-purple-500 transition duration-150'>
                      <div className='space-y-1 text-center'>
                        { imagePreview || blog.url ? (
                          <div className='relative'>
                            <img
                              src={imagePreview || blog.url}
                              alt='Preview'
                              className='mx-auto h-64 w-full object-cover rounded-lg'
                            />
                            <input
                              id='dropzone-file'
                              type='file'
                              onChange={handleChange}
                              accept='image/*'
                              className='sr-only'
                            />
                            <X
                              size={16}
                              className='absolute top-0 right-0 mt-2 mr-2 cursor-pointer'
                              onClick={() => setImagePreview(undefined)}
                            />
                          </div>
                        ) : (
                          <>
                            <ImagePlus className='mx-auto h-12 w-12 text-gray-400' />
                            <div className='flex text-sm text-gray-600'>
                              <label
                                htmlFor='image-upload'
                                className='relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none'
                              >
                                <span>Upload a file</span>
                                <input
                                  id='image-upload'
                                  type='file'
                                  className='sr-only'
                                  accept='image/*'
                                  onChange={handleChange}
                                />
                              </label>
                              <p className='pl-1 text-gray-400'>
                                or drag and drop
                              </p>
                            </div>
                            <p className='text-xs text-gray-400'>
                              High-quality PNG, JPG up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='title'
                      className='block text-bold font-mono  text-gray-300 mb-1'
                    >
                      Title
                    </label>
                    <input
                      type='text'
                      id='title'
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className='block w-full px-4 py-3 bg-black border border-gray-300 rounded-xl text-gray-300 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150'
                      placeholder='Enter a captivating title...'
                      required
                    />
                    <p className='mt-1 text-bold font-mono text-gray-300'>
                      Great titles are short and descriptive (50-60 characters)
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor='description'
                      className='block text-bold font-mono font-medium text-gray-300 mb-1'
                    >
                      Content
                    </label>
                    <Editor
                      apiKey='s73wk7i6fwr11ew23vudqfd79tjyajof2inq6b6qg8a9c9x6'
                      onInit={(_evt, editor) => (editorRef.current = editor)}
                      value={description}
                      init={{
                        height: 500,
                        width: 625,
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
                      onEditorChange={content => setDescription(content)}
                    />
                  </div>

                  <div className=' flex justify-end items-center   pt-5'>
                    <button
                      type='submit'
                      disabled={loading}
                      className='mx-5 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150'
                    >
                      <Send className='w-5 h-5 mr-2' />
                      {loading ? 'Publishing...' : 'Publish Story'}
                    </button>
                    <button  onClick={SendPost}
          type='submit' className="px-5 py-2.5 relative rounded group  text-white font-medium inline-block">
    <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
    <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
    <span className="relative">Publish Post</span>
</button>
                    {/* <button
                      type='submit'
                      disabled={loading}
                      className='inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150'
                    >
                      <Send className='w-5 h-5 mr-2' />
                      {loading ? 'Deleting...' : 'Delete Story'}
                    </button> */}

                    <button onClick={deleteBlog}  className='relative w-36 inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
                      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] ' />
                      <span className='inline-flex tracking-widest h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl'>
                      {loading ? 'Deleting...' : 'Delete Story'}

                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className='p-6'>
                  <div className='prose max-w-none'>
                    <h1 className='text-3xl font-bold text-gray-300 font-mono  mb-4'>
                      {title || 'Your Title Here'}
                    </h1>
                    {  imagePreview || blog.url&& (
                      <img
                        src={  imagePreview || blog.url }
                        alt='Cover'
                        className='w-full h-64 object-cover rounded-xl mb-6'
                      />
                    )}
                    <div className='whitespace-pre-wrap'>
                      <p
                        className='mb-4 text-gray-300 font-mono'
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(description)
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='lg:col-span-1'>
            <div className='sticky top-6'>
              <div className='bg-white rounded-2xl shadow-lg p-6 mb-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-lg font-semibold text-gray-800 flex items-center'>
                    <Lightbulb className='w-5 h-5 mr-2 text-yellow-500' />
                    Writing Tips
                  </h2>
                  <button
                    onClick={() => setShowTips(!showTips)}
                    className='text-gray-400 hover:text-gray-600'
                  >
                    <HelpCircle className='w-5 h-5' />
                  </button>
                </div>

                {showTips && (
                  <div className='space-y-4'>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle2 className='w-5 h-5 text-green-500 mt-0.5' />
                      <div>
                        <h3 className='font-medium text-gray-800'>
                          Engaging Title
                        </h3>
                        <p className='text-sm text-gray-600'>
                          Keep it clear, specific, and intriguing
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start space-x-3'>
                      <BookOpen className='w-5 h-5 text-blue-500 mt-0.5' />
                      <div>
                        <h3 className='font-medium text-gray-800'>Structure</h3>
                        <p className='text-sm text-gray-600'>
                          Use headings and short paragraphs
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start space-x-3'>
                      <AlertCircle className='w-5 h-5 text-purple-500 mt-0.5' />
                      <div>
                        <h3 className='font-medium text-gray-800'>
                          Visual Appeal
                        </h3>
                        <p className='text-sm text-gray-600'>
                          Add relevant images to enhance your story
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className='bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white'>
                <h2 className='text-lg font-semibold mb-4'>
                  Ready to Publish?
                </h2>
                <ul className='space-y-3 text-sm'>
                  <li className='flex items-center'>
                    <CheckCircle2 className='w-4 h-4 mr-2' />
                    Your story will be shared with our community
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle2 className='w-4 h-4 mr-2' />
                    Engage with readers through comments
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle2 className='w-4 h-4 mr-2' />
                    Track your story's performance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='h-32'></div>
        <Footer/>
      </div>
    </div>
  )
}

export default EditBlog
