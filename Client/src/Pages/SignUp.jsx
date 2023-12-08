import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { useState } from "react";
import {useNavigate} from  'react-router-dom'
import Oauth from '../Components/Oauth'
import  display  from "../utility/display-notifcation";

// import '/'
export default function SignUp() {
  const [ setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      // setLoading : true 
      
      setLoading(true);
      e.preventDefault();
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setError(null);

      if (data.success === false) {
        // setError(data.Message);
        display.showMessage('error', data.Message);
        setLoading(false);
      
      }else{
        navigate('/sign-in')
      }
      display.showMessage('success', 'User Created Successfully');
      setLoading(false);
     
    } catch (error) {
      display.showMessage('error',error.message);
      setLoading(false);
      // setError(error.Message);
    }
  };
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  return (
    <>
      <div className="max-w-lg p-4 rounded-lg bg-white mx-auto my-10 ">
        <h1 className="text-center text-3xl  my-4 font-bold ">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-7">
          <div className="flex relative items-center ">
            <input
              type="text"
              className="border p-3 rounded-lg w-full focus:outline-none "
              placeholder="Username"
              onChange={handleOnChange}
              id="userName"
            />
            <AiOutlineUser
              className="absolute right-3 text-gray-700"
              size={20}
            />
          </div>
          <div className="flex relative items-center ">
            <input
              type="email"
              className="border p-3 rounded-lg w-full focus:outline-none "
              placeholder="Email"
              onChange={handleOnChange}
              id="email"
            />
            <AiOutlineMail
              className="absolute right-3 text-gray-700"
              size={20}
            />
          </div>{" "}
          <div className="flex relative items-center ">
            <input
              type="password"
              className="border p-3 rounded-lg w-full focus:outline-none "
              placeholder="Password"
              onChange={handleOnChange}
              id="password"
            />
            <AiOutlineLock
              className="absolute right-3 text-gray-700"
              size={20}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-900 text-white p-3 rounded-lg uppercase"
          >
            {loading ? "Loading...." : "sign UP"}
          </button>
          <Oauth/>

          <p className="text-right">
            Have an Account ?{" "}
            <span className="text-blue-900 mx-2">Sign In</span>
          </p>
        
        </form>
      </div>
    </>
  );
}
