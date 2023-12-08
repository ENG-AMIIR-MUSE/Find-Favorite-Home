import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Header from "./Components/Header";
import PrivateRouter from "./Components/PrivateRouter";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  const notify = () =>
  toast.success('Notification message!', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000, // Close after 5 seconds
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    style: {
      // Example custom styles
      background: '#fff',
      color: '#000',
      fontSize: '16px',
      borderRadius:'10px',
      fontWeight: '400',
     
    },
  });
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element= {<PrivateRouter/>}>
        <Route path="/profile" element={<Profile />} />

        </Route>
      </Routes>
      <div><button onClickCapture={notify}>Clicke</button></div>
      <ToastContainer/>
    </>
  );
}
