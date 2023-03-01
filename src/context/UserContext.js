import React, { useEffect, useReducer } from 'react'
import reducer from './reducer'
import UserState from './UserState';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../lib/firebase';

const UserContext = ({children}) => {
    const initialState = {
        user: null,
        isLoading: false,
        operationType: null,
        isPersisted: false,
        authPending: true,
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const auth = getAuth(app);

    
    useEffect(() => {
      const listener = onAuthStateChanged(auth, (user) => {
        if (user && state.operationType !== 'signIn') {
          dispatch({type: "UPDATE_USER", payload: user});
          dispatch({type: 'USER_PERSISTED', payload: true})
          console.log("logged In");
          } else {
            dispatch({type: 'SIGN_OUT_USER'})
            console.log("user signed out");
          }
          dispatch({type: "UPDATE_AUTH_PENDING", payload: false});
      });
  
      return () => listener();
    }, [auth, state.operationType]);


  return (
    <UserState.Provider value={{state, dispatch}}>
        {children}
    </UserState.Provider>
  )
}

export default UserContext