import React, { useReducer } from 'react'
import reducer from './reducer'
import UserState from './UserState';

const UserContext = ({children}) => {
    const initialState = {
        user: null,
        isLoading: false
    }

    const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <UserState.Provider value={{state, dispatch}}>
        {children}
    </UserState.Provider>
  )
}

export default UserContext