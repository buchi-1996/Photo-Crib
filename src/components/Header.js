import React, { useContext } from "react";
import {Link, useNavigate} from 'react-router-dom'
import UserState from "../context/UserState";


const Header = () => {
  const { state, dispatch } = useContext(UserState);
  const navigate = useNavigate()

  console.log(state);
  return (
    <header className="py-3 bg-gray-50">
      <div className="container mx-auto">
        <nav className="flex flex-row items-center justify-between">
          <div className="logo">
            <Link to="/">
            <h2 className="text-xl font-bold antialiased">Logo</h2>
            </Link>
          </div>
          {/* <ul className="links flex flex-row items-center space-x-10 justify-center">
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul> */}
          <div className="auth flex gap-5 items-center">
            <Link to="/sign-up"><span className="">SignUp</span></Link>
            <Link to="/login">
            <button className="bg-purple-700 hover:bg-purple-800 transition-all duration-300 ease-in-out font-bold text-white rounded-lg w-24 py-3">LogIn</button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
 