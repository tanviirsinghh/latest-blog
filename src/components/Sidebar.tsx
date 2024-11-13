import {   ReactNode } from 'react'

interface Props{
    children?:ReactNode,
    className?:string,
    variant?:string,
    size?:string,
    
    onClick?: ()=> void
   
}
// interface AvatarImageProps {
//     src: string;
//     alt: string;
//   }
  interface StaffPick {
    author: string;
    category: string;
    title: string;
  }
  const staffPicks: StaffPick[] = [
    { author: "Smilin' Jay McDowell", category: "The Riff", title: "Jack White Owns the Coolest Thing In Rock 'n' Roll" },
    { author: "Evin Ibrahim", category: "Sharing Food", title: "Everyone Needs to Try Fresh Figs At Least Once" },
    { author: "The Medium Newsletter", category: "The Medium Blog", title: "Every 40 days, a language dies" },
  ]
  
export default function Sidebar() {
    const Card = ({ children, className = '' }:Props) => (
        <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
      )
      const CardContent = ({ children, className = '' }:Props) => (
        <div className={`p-6 ${className}`}>{children}</div>
      )
      const CardHeader = ({ children }:Props) => <div className="p-6 pb-0">{children}</div>
      const CardTitle = ({ children }:Props) => <h2 className="text-xl font-bold mb-2">{children}</h2>
      const Avatar = ({ children, className = '' }:Props) => (
        <div className={`inline-flex items-center justify-center rounded-full bg-gray-200 ${className}`}>{children}</div>
      )
      // const AvatarImage = ({ src, alt }:AvatarImageProps) => <img src={src} alt={alt} className="rounded-full" />
      // const AvatarImage = (?) => <img src="" alt="" className="rounded-full" />
      const AvatarFallback = ({ children }:Props) => <span>{children}</span>
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
  return (
    <div className=' flex justify-center border rounded-md mt-14 w-full'>
       <Card className="">
              <CardHeader>
                <CardTitle>Staff Picks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {staffPicks.map((pick, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Avatar className="h-6 w-6">
                        {/* <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={pick.author} /> */}
                        <AvatarFallback>{pick.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{pick.author} in {pick.category}</p>
                        <p className="text-sm text-gray-600">{pick.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="link" className="mt-4 p-0">See the full list</Button>
              </CardContent>
            </Card>
    </div>
  )
}
