import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg p-3 my-7 mx-auto">
      <h1 className="text-center text-xl ">Profile</h1>
      <div className="flex justify-center  my-4">
        <img src="" className="rounded-full  bg-blue-900  h-24 w-24 " alt="" />
      </div>

      <form action="" className="flex flex-col gap-2 ">
        <input
          type="text"
          placeholder="Enter Your Name"
          className="rounded-lg  h-[40px] pl-3"
        />
        <input
          type="email"
          placeholder="Enter Your email"
          className="rounded-lg  h-[40px] pl-3"
        />
        <input
          type="password"
          placeholder="Enter Your password"
          className="rounded-lg  h-[40px] pl-3"
        />
        <input
          type="submit"
          value="submit"
          className="rounded-lg  pl-3 bg-blue-900 text-white p-3 text-xl"
        />
        <input
          type="button"
          value="Create Listings"
          className="rounded-lg  pl-3 bg-green-900 text-white p-3 text-xl"
        />
        <div className="flex justify-between">
          <p className="text-red-900">Sign Out</p>
          <p className="text-red-900 ">Listengs</p>
        </div>
        {/* <input type="text" placeholder='Enter Your Name' /> */}
      </form>
    </div>
  );
}
