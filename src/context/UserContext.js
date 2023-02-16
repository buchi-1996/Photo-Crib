import React, { useEffect, useReducer } from 'react'
import reducer from './reducer'
import UserState from './UserState';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../lib/firebase';

const UserContext = ({children}) => {
    const initialState = {
        user: null,
        isLoading: false
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const auth = getAuth(app);

    useEffect(() => {
      const listener = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("logged In");
          dispatch({
            type: "UPDATE_USER",
            payload: user,
          });
        } else {
          console.log("user signed out");
          dispatch({type: 'SIGN_OUT_USER'})
        }
      });
  
      return () => listener();
    }, [auth]);


  return (
    <UserState.Provider value={{state, dispatch}}>
        {children}
    </UserState.Provider>
  )
}

export default UserContext