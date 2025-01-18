import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { toast } from 'react-toastify';
//using
const LatestSignin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
    const navigate= useNavigate()
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const response =  await  axios.post(`${BACKEND_URL}/api/v1/user/signin`, 
        formData
      )
        const token = response.data.token
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

 }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl flex flex-col items-center ">
        <h1 className=" text-4xl font-bold text-gray-400 mb-8">Welcome to <span className='text text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500'>Large</span></h1>
        <div className="border-black border-4 w-full max-w-md rounded-lg overflow-hidden bg-black transform hover:scale-[1.02] transition-transform
  shadow-[5px_5px_0px_0px_rgba(109,40,217),10px_10px_0px_0px_rgba(109,40,217,0.6)]">
              <div className="p-8">
            <h3 className="text-3xl font-bold mb-6 text-center text-gray-400">Sign In</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  required
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700">
                  <MailIcon />
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  required
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700">
                  <LockIcon />
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-yellow-50 font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 hover:text-white transition-all duration-300 transform hover:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </form>
            <Link to="/signup">
            <p className="mt-6 text-sm text-gray-400 text-center">
              Don't have an account? <h5  className="font-semibold underline hover:text-indigo-600">Sign up here</h5>
            </p></Link>
          </div>
        </div>
        <div className="mt-12 flex justify-center space-x-8">
          <FeatureCard icon={<PenIcon />} title="Write" description="Share your stories" />
          <FeatureCard icon={<BookOpenIcon />} title="Read" description="Explore new ideas" />
          <FeatureCard icon={<UsersIcon />} title="Connect" description="Join the community" />
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-4 bg-black rounded-lg shadow-md border-2 border-gray-600">
    <div className="text-gray-400 mb-2">{icon}</div>
    <h3 className="font-semibold text-bold font-mono text-gray-400">{title}</h3>
    <p className="text-sm text-gray-400 font-mono text-center">{description}</p>
  </div>
);

const MailIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LockIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const PenIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
    <path d="M2 2l7.586 7.586"></path>
    <circle cx="11" cy="11" r="2"></circle>
  </svg>
);

const BookOpenIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="indigo" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const UsersIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export default LatestSignin;

