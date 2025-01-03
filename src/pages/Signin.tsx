// import { cn } from "@/./lib/utils";
import {Auth} from '../components/Auth';

export default function Signin() {
// 5 second delay
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg border bg-background h-screen md:shadow-xl">
   
      {/* Grid Pattern Component */}
     

      {/* Signin Component */}
      <div className="z-10 mt-8">
      <div className="">
      
<div>
    <Auth type='signin'/>
</div>
<div className="hidden lg:block">
{/* <Quote/> */}
</div>
</div> {/* Ensure Signin has necessary classes */}
      </div>
    </div>
  );
}
