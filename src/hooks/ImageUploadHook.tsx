import { toast } from 'react-toastify'
import { CLOUDINARY_URL } from '../config'
import axios from 'axios'

const useImageUploadHook = async (image: File): Promise<string | undefined> => {
  const data = new FormData()
  data.append('file', image)
  data.append('upload_preset', 'Blog-Project')
  data.append('cloud_name', 'dktr9buob')
  console.log('start request')
  try {
    const response = await axios.post(`${CLOUDINARY_URL}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const imgurl = response.data.secure_url

    return imgurl
  } catch (e) {
    toast.error('Error Occurred / Please Re-Upload')
    return undefined
  }
}

export default useImageUploadHook
