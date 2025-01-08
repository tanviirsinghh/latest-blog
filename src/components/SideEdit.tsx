import { AlertCircle, BookOpen, CheckCircle2, HelpCircle, Lightbulb } from "lucide-react"
import { useState } from "react"
  




export default function SideEdit() {
    const [showTips, setShowTips] = useState(true)
  return (
    <div>
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
                      <AlertCircle className='w-5 h-5 text-indigo-500 mt-0.5' />
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

              <div className='bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white'>
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
  )
}


















        