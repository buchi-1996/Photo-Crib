import React, { useContext, useEffect, useState } from "react";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import app from "../../lib/firebase";
import Error from "../../components/Error";
import Loader from "../../components/loader/Loader";
import UserState from "../../context/UserState";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  pageSlide,
  pageTransition,
} from "../../helpers/framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrorMessage] = useState("");

  const isInvalid = email === "" || password === "";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSucess] = useState("");
  const { dispatch } = useContext(UserState);
  const navigate = useNavigate();
  

  const auth = getAuth(app);
  console.log(auth)

  

  // Handle User SignIn
  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setIsLoading(true);
            // Signed in
            const user = userCredential.user;
            dispatch({
              type: "UPDATE_USER",
              payload: user,
            });
            console.log(user);
            setIsLoading(false);
            setIsSucess("Login Successful");
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
            console.log(errorCode, errorMessage);
            setIsLoading(false);
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.title = "Sign In - PhotoCrib";
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 15000);
  }, [errMessage]);

  // const getData = async () => {
  //   const data = await fetch('https://api.coinstats.app/public/v1/coins?skip=0');
  //   const resData = await data.json()
  //   console.log(resData);
  // }

  // useEffect(() => {
  //   getData();
  // }, [])

  return (
    <div className="container mx-auto h-[calc(100vh-100px)] flex flex-col justify-center">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageSlide}
        transition={pageTransition}
      >
        <div className="sm:rounded-md w-full max-w-sm mx-auto">
          <h4 className="font-bold text-center text-2xl mb-5">Log In</h4>
          {errMessage ? (
            <Error
              errColor="bg-red-500"
              border="border-red-500"
              errMessage={errMessage}
            />
          ) : (
            isSucess && (
              <Error
                errColor="bg-green-500"
                border="border-green-500"
                errMessage={isSucess}
              />
            )
          )}
          <form onSubmit={handleSignIn}>
            <div className="input-group mb-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="Email"
                id="email"
                className="w-full text-[16] px-5 py-2 outline-none focus:ring-purple-500 focus:ring-1 borber-gray-900 border rounded"
              />
            </div>
            <div className="input-group mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  placeholder="Password"
                  id="password"
                  className="w-full text-[16] px-5 py-2 outline-none focus:ring-purple-500 focus:ring-1 borber-gray-900 border rounded"
                />
                <span
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute top-0 flex items-center justify-center right-0 cursor-pointer py-2 px-3 h-full"
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isInvalid}
              className={`${isInvalid && "opacity-50"} bg-purple-700 ${
                isInvalid ? "cursor-not-allowed" : "cursor-pointer"
              } hover:bg-purple-800 transition-all duration-300 ease-in-out h-12 font-bold text-white rounded-lg w-full py-2`}
            >
              {!isLoading ? "Log In" : <Loader color='bg-white' />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
