import React,  {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import UserState from '../context/UserState';
import { getAuth, signOut } from "firebase/auth";
import app from '../lib/firebase';

const DashboaderHeader = () => {
    const {state, dispatch} = useContext(UserState); 
    const auth = getAuth(app)
    const navigate = useNavigate()
    const handleSignOut = () => {
      signOut(auth).then(() => {
        navigate('/sign-up')
        dispatch({type: 'SIGN_OUT_USER'})
        console.log(state)
      })
    }

    console.log(state.user.photoURL);
  return (
    <header className="py-4 bg-gray-50">
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
          <button onClick={handleSignOut} className="bg-purple-700 hover:bg-purple-800 transition-all duration-300 ease-in-out font-bold text-white rounded-lg w-24 py-3">Sign Out</button>
            <button className='flex flex-row items-center space-x-2'>
            <span className='capitalize mt-1'>{state.user.displayName}</span>
            <span className="w-10 h-10 border border-gray-100 overflow-hidden rounded-full"><img src={state.user.photoURL} alt="image" className='object-cover w-full h-full' /></span>
            </button>
           
          </div>
        </nav>
      </div>
    </header>
  )
}

export default DashboaderHeader