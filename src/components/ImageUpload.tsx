
import {  useState } from 'react'

type getImgFile = { // getting this file to the parent function, its a callback function that gets called here
  getImgFile: (file: File | null) => void;
}


// this is the code we are using
export default function ImageUpload ({getImgFile}: getImgFile) {
  const [image, setImage] = useState<File | null>(null)

   
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files
    if (fileInput && fileInput[0]) {
      const file = fileInput[0]
      setImage(file)
      getImgFile(file)  // retrieving the file from the state here and passing it through props to the parent function

    }
  }
  
  return (
    <>
    {/* <div>
      <div>
        <input type='file' onChange={onChange}></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={url} />
      </div>
    </div> */}
    {/* below is the new css rich image upload button */}
   
     <div className="flex items-center justify-center h-full w-full">
     <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
         <div className="flex flex-col items-center justify-center pt-5 pb-6">
             <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
             </svg>
             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
             <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
         </div>
         <input id="dropzone-file" type="file" onChange={onChange} className="hidden" />
 
         {/* <img src={url} /> */}
         {/* this is the retrieved url and we will store this in the database with our tittle and blog  */}
         {/* <button onClick={uploadImage}>Upload</button>    */} 
         {/* this button will upload the image to the cloudinary server and we will integrate this with the submit button */}
     </label>
 </div> 
 </>
    
  )
}
