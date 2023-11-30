import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="max-w-lg mx-auto p-3 my-7">
        <h1 className="text-center text-4xl mb-5">Profile</h1>

        <form className="flex  flex-col gap-2   justify-center items-center">
          <img
            src={currentUser.avatar}
            className="w-[80px] h-[80px] object-cover object-center   rounded-full  cursor-pointer "
          />
          <input
            type="text"
            className="p-3  border  rounded-lg w-full"
            placeholder="username"
          />
          <input
            type="text"
            className="p-3  border  rounded-lg w-full"
            placeholder="Email"
          />
          <input
            type="text"
            className="p-3  border  rounded-lg w-full"
            placeholder="Password"
          />
          <input
            type="submit"
            className="p-3  border  rounded-lg w-full bg-blue-900 text-white text-xl"
          />
          <button className="bg-green-900 w-full text-white p-3 text-xl rounded-lg">
            Create Listings
          </button>
          <div className="w-full  flex justify-between p-3 text-red-900">
            <div className="">
              <button className="text-red-700">sign out</button>
            </div>
            <div className="">
              <button className="text-red-700">sign out</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
