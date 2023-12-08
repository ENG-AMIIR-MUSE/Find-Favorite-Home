import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signSuccess,signInFailure } from "../redux/userSlice";
import Oauth from "../Components/Oauth";
import display from "../utility/display-notifcation";
// import '/'
export default function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading}= useSelector((state)=>state.user)
  const dispatch  =  useDispatch()
  const navigate = useNavigate();
  const handleOnChange = (e) => {
     
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

     
      if (data.success === false) {
        display.showMessage('error',data.Message)
        dispatch(signInFailure(data.Message))
       
        return ;
        
      }
      dispatch(signSuccess(data))
      display.showMessage('success',"Login Successfully")
      navigate("/");
    } catch (error) {
      display.showMessage("success",error.message)
    }
  };
  return (
    <>
      <div className="max-w-lg p-5 rounded-lg bg-white mx-auto my-10 ">
        <h1 className="text-center text-3xl  my-4 font-bold ">
          Login Your Account
        </h1>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 my-7">
          <div className="flex relative items-center ">
            <input
              type="email"
              className="border p-3 rounded-lg w-full focus:outline-none "
              placeholder="Email"
              id="email"
              onChange={handleOnChange}
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
              id="password"
              onChange={handleOnChange}
            />
            <AiOutlineLock
              className="absolute right-3 text-gray-700"
              size={20}
            />
          </div>
          <button
            disabled={loading}
            className="bg-blue-900 text-white p-3 rounded-lg uppercase"
          >
            {loading ? "Loading ... " : "Login"}
          </button>
        <Oauth/>
          <p className="text-right">
            Does'nt Have an Account ?{" "}
            <span className="text-blue-900 mx-2 ">Sign Up</span>
          </p>
         
        </form>
      </div>
    </>
  );
}
