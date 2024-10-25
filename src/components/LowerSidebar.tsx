
import {   ReactNode } from 'react'
// Simplified component definitions
interface Props{
    children?:ReactNode,
    className?:string,
    variant?:string,
    size?:string,
    
    onClick?: ()=> void
   
}


const Card = ({ children, className = '' }:Props) => (
  <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
)
const CardContent = ({ children, className = '' }:Props) => (
  <div className={`p-6 ${className}`}>{children}</div>
)
const CardHeader = ({ children }:Props) => <div className="p-6 pb-0">{children}</div>
const CardTitle = ({ children }:Props) => <h2 className="text-xl font-bold mb-2">{children}</h2>

// const AvatarImage = (?) => <img src="" alt="" className="rounded-full" />
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }:Props) => (
  <button 
    className={`
      ${variant === 'ghost' ? 'bg-transparent hover:bg-gray-100' : 'bg-blue-500 text-white hover:bg-blue-600'}
      ${size === 'sm' ? 'px-2 py-1 text-sm' : 'px-4 py-2'}
      rounded ${className}
    `}
    {...props}
  >
    {children}
  </button>
)







const recommendedTopics = ["Data Science", "Self Improvement", "Technology", "Writing", "Relationships", "Politics", "Cryptocurrency"]

export default function LowerSidebar() {

  

  return (
    

            <Card>
              <CardHeader>
                <CardTitle>Recommended topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recommendedTopics.map((topic) => (
                    <Button key={topic} variant="secondary" size="sm">
                      {topic}
                    </Button>
                  ))}
                </div>
                <Button variant="link" className="mt-4 p-0">See more topics</Button>
              </CardContent>
            </Card>
          
  )
}