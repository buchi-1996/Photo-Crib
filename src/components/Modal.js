import React, { useContext } from "react";
import UserState from "../context/UserState";

const Modal = ({ children }) => {
  const { dispatch } = useContext(UserState);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        onClick={() => dispatch({ type: "IS_MODAL_OPEN" })}
        className="absolute inset-0 bg-white/20   backdrop-blur-md  w-full h-full overflow-y-hidden z-30"
      >
        <div className="z-50">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
