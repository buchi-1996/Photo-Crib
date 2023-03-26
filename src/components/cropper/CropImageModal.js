import React, { useCallback, useContext, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import UserState from "../../context/UserState";
import getCroppedImg from "./Cropped";

const CropImageModal = ({ selected, setFile, editProfilePic }) => {
  const { dispatch } = useContext(UserState);
  console.log(selected);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [uploadedImg, setUploadedImg] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    const getImgData = () => {
      if (selected) {
        setUploadedImg(URL.createObjectURL(selected));
      }
    };

    return () => getImgData();
  }, [selected]);

  console.log(uploadedImg);

  const croppedImg = async () => {
    try {
      const { file } = await getCroppedImg(
        uploadedImg,
        croppedAreaPixels,
        rotation
      );
      setFile(file);
      setUploadedImg(URL.createObjectURL(file));
    } catch (err) {
      console.log(err);
    }
    dispatch({ type: "IS_MODAL_OPEN" });
  };

  console.log(uploadedImg);
  return (
    <div
      className="relative mx-auto max-w-xl mt-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <div className="flex flex-row justify-between items-center my-5 text-sm">
              <label className="block text-sm font-medium text-gray-700">
                Edit and save photo
              </label>
            </div>
            <div className="relative flex flex-row items-center justify-center">
              <Cropper
                image={uploadedImg}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                cropShape="round"
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
              />
              <div className="h-72" />
            </div>
          </div>
          <div className="">
            <div className="">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Zoom Photo
              </label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className="w-full "
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Rotate Photo
            </label>
            <input
              type="range"
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e) => {
                setRotation(e.target.value);
              }}
              className="w-full "
            />
          </div>
        </div>
        <div className="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            onClick={(e) => dispatch({ type: "IS_MODAL_OPEN" })}
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={croppedImg}
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropImageModal;
