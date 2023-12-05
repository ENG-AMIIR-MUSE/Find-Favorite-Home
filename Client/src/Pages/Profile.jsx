import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const [file, setFile] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(null);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (er) => {
        setFileError(er);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormData({ ...formData, avatar: url });
        });
      }
    );
  };

  return (
    <div className="max-w-lg p-3 my-7 mx-auto">
      <h1 className="text-center text-xl ">Profile</h1>

      <input
        type="file"
        ref={fileRef}
        hidden
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div className="flex justify-center  my-4">
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          className="rounded-full  bg-blue-900  h-24 w-24 object-cover object-center "
          alt=""
        />
      </div>
      <p className="text-center mb-2">
        {fileError ? (
          <span className="text-red-900">There is an Error While Uplaoding File</span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-900">{`Uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-900">File Uploaded Successfully</span>
        ) : (
          ""
        )}
      </p>

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
