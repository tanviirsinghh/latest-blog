
import {Auth} from '../components/Auth';


function Signup() {
    return(
        <>
        
    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg border bg-background h-screen md:shadow-xl">


      {/* Signin Component */}
      <div className="">
            <div className=''>
                <Auth type='signup' />
            </div>
            <div className="hidden lg:block">
       
           </div>
        </div>
    </div>
  
       
   
         </>
    )

}

export default Signup