import React, { useState } from 'react';

type getImgFile = { // getting this file to the parent function, its a callback function that gets called here
  getImgFile: (file: File | null) => void;
}


const ImageUpload = ({getImgFile}: getImgFile) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined >(undefined);


  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // storing the image url for quick preview
      // When you create an object URL using URL.createObjectURL(), 
      //it occupies memory in the browser until it's manually released. 
      //If you create multiple object URLs without revoking them, 
      //it can lead to a memory leak, as the URLs remain allocated even if they are no longer needed.
      // if old img present and new image is getting update the revoke the first image
            getImgFile(file)
      setImage(file)
      if(imagePreview){
        URL.revokeObjectURL(imagePreview)

      }
      const newPreviewURL = URL.createObjectURL(file)
      setImagePreview(newPreviewURL)

      // storing the img file to send it to the cloudinary server
      // setImage(file)
      console.log("img stored in the state")
    }
  };

  return (
   <div className=' w-2/4 h-full flex justify-center items-end'>
  <div className="w-full max-w-2xl mx-auto flex justify-center items-center">
    <div
      className="w-full relative border-2  border-gray-300 rounded-lg overflow-hidden"
      style={{
        width: '80%',
        height: '160px', // Fixed height
      }}
    >
      {image ? (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={imagePreview}
            alt="Blog"
            className="w-full h-full object-fill"
          />
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer absolute inset-0"
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              ></path>
            </svg>
            <p className="mt-2 text-sm text-white">Click to change image</p>
          </label>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </label>
      )}
      <input
        id="dropzone-file"
        type="file"
        onChange={handleChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  </div>
</div>

  );
};

export default ImageUpload;








// import {  useState } from 'react'

// type getImgFile = { // getting this file to the parent function, its a callback function that gets called here
//   getImgFile: (file: File | null) => void;
// }


// // this is the code we are using
// export default function ImageUpload ({getImgFile}: getImgFile) {
//   const [image, setImage] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)

   
//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const fileInput = event.target.files
//     if (fileInput && fileInput[0]) {
//       const file = fileInput[0]
//       setImage(file)
//               // retrieving the file from the state here and passing it through props to the parent function

//       getImgFile(file)
      
//       if(imagePreview){
//          URL.revokeObjectURL(imagePreview)
      
//       }
//       const imgUrl = URL.createObjectURL(file)
//       setImagePreview(imgUrl)
//     }
//   }
  
//   return (
//     <>
// {/*    
//    {image?  (

                 
//                     <div className="flex items-center justify-center h-full w-full">
//                     <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                             <img
//                 src={imagePreview}
//                 alt='Profile'
//                 className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"               />                     
//                             <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//                         </div>
                  
                     
//                     </label>
//                 </div> 
//                 )  :
//      <div className="flex items-center justify-center h-full w-full">
//      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//          <div className="flex flex-col items-center justify-center pt-5 pb-6">
//              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//              </svg>
//              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//          </div>
//          <input id="dropzone-file" type="file" onChange={onChange} className="hidden" />
   
         
//      </label>
//  </div> 
// } */}


// </>

//   )
// }
