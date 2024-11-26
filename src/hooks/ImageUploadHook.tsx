import { toast } from "react-toastify"
import { CLOUDINARY_URL } from "../config"
import axios from "axios"

//  we have to tell the hook what it is returning to be typesafe
const useImageUploadHook = async (image : File): Promise<string | undefined> => {

    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'Blog-Project')
    data.append('cloud_name', 'dktr9buob')
    console.log('start request')
    try {
        console.log('Starting image upload...');

      const response = await axios.post(`${CLOUDINARY_URL}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    //   inside the imageUpload hook
    console.log("inside the imageUploadhook")
    //   console.log(response.data.secure_url)
      console.log('complete')
      
      const imgurl = response.data.secure_url
    //   setUrl(imgurl)
       
      return imgurl
    } catch (e) {
        console.log("error while uploading the image")
      toast.error('Error Occurred / Please Re-Upload')
      return undefined;
      
    }
}

export default  useImageUploadHook;