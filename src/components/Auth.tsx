import { ChangeEvent, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { SignupInput } from '../../../common/dist/index';
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";


export const Auth =({type}: {type:"signup" | "signin"}) =>{
    const navigate= useNavigate()
    const [inputs, setInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:"",
        // blogName:""
        
    })

  async function sendRequest(){
    try{
      const response =  await axios.post(`${BACKEND_URL}/api/v1/user/${type=== "signup"? "signup" : "signin"}`, inputs)
        const token = response.data.token
        // const jwt = "Bearer" + response.data.token;
        // localStorage.setItem("token", jwt)
        // console.log(token)
        localStorage.setItem("token", token)
        console.log(token)
            navigate('/blogs')
            toast.success('Signup successfull')

}catch (e : unknown ){
    if(axios.isAxiosError(e) && e.response?.status === 401){
   toast.error('User not found / Sign up first')
} else if (axios.isAxiosError(e) && e.response?.status === 500){
    toast.error('Please try again / Internal Server Error')
}
else if (axios.isAxiosError(e) && e.response?.status === 411){
    toast.error('Input Not Correct')
}
// else if (axios.isAxiosError(e) && e.response?.status === 403){
//     toast.error('Email Already in use')
// }
 }
}
    return(
    
    <div className=" h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">

            <div className="text-3xl font-extrabold">
                Create an account
            </div>
            <div className="text-slate-500">
               {type === "signin" ? "Don't have an account?" : "Already have an account"}
                <Link className="pl-2 underline" to={type=== "signin"? "/signup" : "/signin"}>
                    {type==="signin"? "sign up" : "sign in"}
                </Link>
            </div>
            </div>
            <div className="pt-8">
                {type === "signup" ?
            <LabelledInput label="Name" placeholder="name" onChange={(e) =>{
             setInputs({
                ...inputs,
                name:e.target.value
             })
            }}/> : null }
            <LabelledInput label="email" placeholder="xyz@gmail.com" onChange={(e) =>{
             setInputs({
                ...inputs,
                email:e.target.value
             })
            }}/>
            <LabelledInput label="Password" type={"password"} placeholder="password" onChange={(e) =>{
             setInputs({
                ...inputs,
                password:e.target.value
             })
            }}/>
           <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
           focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
           dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>

            </div>
            </div>
            
            </div>
            </div>
           
    )
}

interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?:string

}
function LabelledInput({label,placeholder,onChange, type}:LabelledInputType){
    return<div>
    <label className="block mb-2 text-sm font-semibold">{label}</label>
    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
}