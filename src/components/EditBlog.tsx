import React, { useState, ChangeEvent } from 'react'
import {
  ImagePlus,
  Send,
  X,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  BookOpen
} from 'lucide-react'
import { useLocation } from 'react-router-dom'

function EditBlog () {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
  const [showTips, setShowTips] = useState(true)
  const location = useLocation()
  const { blog } = location.state
  const [title, setTitle] = useState(blog.title)
  const [description, setDescription] = useState(blog.content)
  const [imagePreview, setImagePreview] = useState<string | null>(blog.url)
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, description, imagePreview })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-400 mb-4'>
            Create Your Story
          </h1>
          <p className='text-lg text-gray-500'>
            Share your thoughts and inspire others
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Form */}
          <div className='lg:col-span-2 '>
            <div className='from-gray-950 via-slate-950 to-slate-00 rounded-2xl shadow-slate-950 shadow-2xl overflow-hidden'>
              {/* Tabs */}
              <div className='flex border-b border-gray-200'>
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
                        {imagePreview ? (
                          <div className='relative'>
                            <img
                              src={imagePreview}
                              alt='Preview'
                              className='mx-auto h-64 w-full object-cover rounded-lg'
                            />
                            <button
                              type='button'
                              onClick={() => setImagePreview(null)}
                              className='absolute top-2 right-2 p-2 bg-red-500 text-gray-300 rounded-full hover:bg-red-600 transition'
                            >
                              <X size={16} />
                            </button>
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
                                  onChange={handleImageChange}
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
                      className='block text-sm font-medium text-gray-300 mb-1'
                    >
                      Title
                    </label>
                    <input
                      type='text'
                      id='title'
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className='block w-full px-4 py-3 bg-gray-800 border border-gray-300 rounded-xl text-gray-300 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150'
                      placeholder='Enter a captivating title...'
                      required
                    />
                    <p className='mt-1 text-sm text-gray-300'>
                      Great titles are short and descriptive (50-60 characters)
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium text-gray-300 mb-1'
                    >
                      Content
                    </label>
                    <textarea
                      id='description'
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      rows={12}
                      className='block w-full px-4 py-3 bg-gray-800 border border-gray-300 rounded-xl text-gray-300 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150'
                      placeholder='Start writing your story...'
                      required
                    />
                  </div>

                  <div className='flex justify-end pt-4'>
                    <button
                      type='submit'
                      className='inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150'
                    >
                      <Send className='w-5 h-5 mr-2' />
                      Publish Story
                    </button>
                  </div>
                </form>
              ) : (
                <div className='p-6'>
                  <div className='prose max-w-none'>
                    <h1 className='text-3xl font-bold mb-4'>
                      {title || 'Your Title Here'}
                    </h1>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt='Cover'
                        className='w-full h-64 object-cover rounded-xl mb-6'
                      />
                    )}
                    <div className='whitespace-pre-wrap'>
                      {description || 'Your content will appear here...'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar with Writing Tips */}
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
    </div>
  )
}

export default EditBlog
