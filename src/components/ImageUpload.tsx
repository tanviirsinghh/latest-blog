


import axios from "axios";
import { CLOUDINARY_URL } from  "../config";
import {  useState } from 'react'
import { toast } from 'react-toastify'

export default function ImageUpload () {


  const [image, setImage] = useState<File | null> (null)
  const [url, setUrl] = useState('')

  const uploadImage = async () => {
    if (!image) {
        console.log("No image selected");
        toast.error("Upload image")
        return;
      }
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'Blog-Project')
    data.append('cloud_name', 'dktr9buob')
    console.log("start request")
    try{
    const response = await axios.post(`${CLOUDINARY_URL}`, 
      data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
    }
    )
    console.log(response.data.secure_url)
    console.log("complete")
    setUrl(response.data.secure_url)}

    catch(e){
    return Response.json({
        msg:"Image didn't upload"
    })
    }
    //   .then(resp => resp.json())
    //   .then(data => {
    //     setUrl(data.url)
    //   })
    //   .catch(err => console.log(err))
  }

 const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files;
    if(fileInput && fileInput[0]){
        const file = fileInput[0];
        setImage(file)

    }
 }
  return (
    <div>
      <div>
        <input type='file' onChange={onChange}></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={url} />
      </div>
    </div>
  )
}
