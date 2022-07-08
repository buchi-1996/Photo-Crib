import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SIGN_OUT_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
