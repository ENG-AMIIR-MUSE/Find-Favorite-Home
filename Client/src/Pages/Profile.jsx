import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import display from "../utility/display-notifcation";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

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
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/users/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("data", data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        display.showMessage('error', data.Message)
        return;
      }

      dispatch(updateUserSuccess(data));
      display.showMessage('success', "Profile Updated Successfully")
      console.log("data", data)
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    if (confirm('Are Sure You Want To Delete Your Account Permently')) {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/users/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.Message));
          display.showMessage("error", data.Message)
          return;
        }
        dispatch(deleteUserSuccess(data));
        display.showMessage('success', data)
        console.log(data)
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
        display.showMessage('error', error.message)
      }
    } else {
       return ;
    }
  }



return (
  <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
      />
      {console.log(currentUser)}
      <img
        onClick={() => fileRef.current.click()}
        src={formData.avatar || currentUser.avatar}
        alt="profile"
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
      />
      <p className="text-sm self-center">
        {fileUploadError ? (
          <span className="text-red-700">
            Error Image upload (image must be less than 2 mb)
          </span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-700">Image successfully uploaded!</span>
        ) : (
          ""
        )}
      </p>
      <input
        type="text"
        placeholder="username"
        defaultValue={currentUser.username}
        id="userName"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="email"
        id="email"
        defaultValue={currentUser.email}
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        onChange={handleChange}
        id="password"
        className="border p-3 rounded-lg"
      />
      <button
        disabled={loading}
        className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
      >
        {loading ? "Loading..." : "Update"}
      </button>
      <Link
        className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
        to={"/create-listing"}
      >
        Create Listing
      </Link>
    </form>
    <div className="flex justify-between mt-5">
      <span
        onClick={handleDeleteUser}
        className="text-red-700 cursor-pointer"
      >
        Delete account
      </span>
      <span className="text-red-700 cursor-pointer">Sign out</span>
    </div>

    <p className="text-red-700 mt-5">{error ? error : ""}</p>
  </div>
);
}
