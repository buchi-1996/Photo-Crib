import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserState from "../context/UserState";
import { getAuth, signOut } from "firebase/auth";
import app from "../lib/firebase";

const DashboaderHeader = () => {
  const { state, dispatch } = useContext(UserState);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();

  // Handle User Signs Out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch({ type: "SIGN_OUT_USER" });
      navigate("/login");
      console.log(state);
    });
  };

  console.log(state.user.photoURL);
  return (
    <header className="py-4 bg-gray-50">
      <div className="container mx-auto">
        <nav className="flex flex-row items-center justify-between">
          <div className="logo">
            <Link to="/">
              <h2 className="text-xl font-bold antialiased">
                Photo
                <span className="font-bold text-2xl italic text-indigo-800">
                  C
                </span>
                rib
              </h2>
            </Link>
          </div>
          {/* <ul className="links flex flex-row items-center space-x-10 justify-center">
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul> */}
          <div className="auth flex gap-5 items-center">
            <button
              onClick={handleSignOut}
              className="bg-purple-700 hover:bg-purple-800 transition-all duration-300 ease-in-out font-bold text-white rounded-lg w-24 py-3"
            >
              Sign Out
            </button>
            <button
              onClick={() => setToggleDropdown(true)}
              className="relative flex flex-row items-center space-x-2"
            >
              <span className="capitalize mt-1">{state.user.displayName}</span>
              <span className="w-10 h-10 border border-gray-100 overflow-hidden rounded-full">
                <img
                  src={state.user.photoURL}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </span>
              {toggleDropdown && (
                <div className="bg-white rounded shadow-lg absolute z-50 top-12 right-0 xl:right-auto w-44 py-2">
                  <ul>
                    <Link to="/dashboard" onClick={(e) => e.stopPropagation()}>
                      <li
                        onClick={() => setToggleDropdown(!toggleDropdown)}
                        className="flex flex-row space-x-2 items-center hover:bg-gray-50 px-4 py-2"
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                            />
                          </svg>
                        </span>
                        <span className="text-sm">Dashboard</span>
                      </li>
                    </Link>
                    <li className="flex flex-row space-x-2 items-center hover:bg-gray-50 px-4 py-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                      </span>
                      <span className="text-sm">My Profile</span>
                    </li>
                    <Link to="/settings" onClick={(e) => e.stopPropagation()}>
                      <li
                        onClick={() => setToggleDropdown(!toggleDropdown)}
                        className="flex flex-row space-x-2 items-center hover:bg-gray-50 px-4 py-2"
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </span>
                        <span className="text-sm">Settings</span>
                      </li>
                    </Link>
                    <li
                      onClick={handleSignOut}
                      className="flex flex-row space-x-2 items-center hover:bg-gray-50 px-4 py-2"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                          />
                        </svg>
                      </span>
                      <span className="text-sm">Log Out</span>
                    </li>
                  </ul>
                </div>
              )}
            </button>
            {toggleDropdown && (
              <div
                onClick={() => setToggleDropdown(false)}
                className="absolute inset-0 bg-white/20  backdrop-blur-md  w-full h-full z-30"
              />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DashboaderHeader;
