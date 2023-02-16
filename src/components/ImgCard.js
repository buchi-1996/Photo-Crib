import React from "react";
// import UserState from "../context/UserState";

const ImgCard = ({ Description, Title, id, Photo }) => {
  // const { state } = useContext(UserState);

  return (
    <>
      <div className="relative rounded shadow-lg my-3 h-full overflow-hidden transform transition duration-300ms ease-linear z-100 cursor-pointer">
        <img src={Photo} alt="" className="w-full h-full object-cover aspect-video" />
        <div className="absolute bg-gradient-to-t from-black/75 to-transparent inset-0" />
        <h4 className="title absolute bottom-5 left-5 text-white font-medium">{Title}</h4>
      </div>
    </>
  );
};

export default ImgCard;
