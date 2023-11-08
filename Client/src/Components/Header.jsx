import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const {currentUser} = useSelector((state) => state.user);
  console.log("currentUser", currentUser);
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
          <span className="text-blue-900 ">Find-Perfec</span>
          <span className=" ">-House</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="search"
            placeholder="Search here"
          />
          <FaSearch />
        </form>
        <ul className="flex  gap-4 items-center">
          <Link to="/">
            <li className="bg-blue-900  rounded-lg p-2 text-white">home</li>
          </Link>
          

          <Link to="/sign-up">
            <li className="uppercase">Sign Up </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.avatar} className="w-7 h-7 object-cover" />
            ) : (
              <Link to="/sign-in">Sign in</Link>
            )}
          </Link>
       
        </ul>
      </div>
    </header>
  );
}
