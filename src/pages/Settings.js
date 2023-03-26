import React, { useContext, useEffect, useRef, useState } from "react";
import UserState from "../context/UserState";
import app from "../lib/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import Modal from "../components/Modal";
import CropImageModal from "../components/cropper/CropImageModal";
import { ClipLoader } from "react-spinners";
import Loader from "../components/loader/Loader";

const Settings = () => {
  const { state, dispatch } = useContext(UserState);
  const [isEditing, setIsEditing] = useState(false);
  const type = ["image/png", "image/jpeg"];
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const username = useRef();
  const auth = getAuth(app);

  const [formData, setFormData] = useState({
    name: state.user?.displayName,
    email: state.user?.email,
  });

  const onChangeInt = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEdit = () => {
    dispatch({ type: "IS_MODAL_OPEN" });
  };

  const handleFileUpload = (e) => {
    const choosen = e.target.files[0];
    if (choosen && type.includes(choosen.type)) {
      setSelected(choosen);
      console.log(selected);
      dispatch({ type: "IS_MODAL_OPEN" });
    } else {
      // setError("Please select an Image file (png or jpeg)");
    }
    e.target.value = null;
  };

  useEffect(() => {
    const uploadFile = (file) => {
      if (!file) return;
      setLoadingSpinner(true);
      const storage = getStorage(app);
      const storageRef = ref(storage, `profiles/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          console.log(progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setDownloadURL(downloadURL);
            // state.user.photoURL = downloadURL;

            dispatch({ type: "UPDATE_PROFILE_PIC", payload: downloadURL });

            updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            });

            setProgress(0);
            setLoadingSpinner(false);
          });
        }
      );
    };

    uploadFile(file);
  }, [file, auth.currentUser, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    username.current.focus();
    if (isEditing) return;
    console.log(downloadURL);
    console.log(formData);
  };

  return (
    <div className={`container mx-auto max-w-2xl mt-10`}>
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <div className="flex flex-row justify-between items-center text-sm">
                <label className="block text-sm font-medium text-gray-700">
                  User Profile Pic
                </label>
              </div>
              <div className="mt-1 flex flex-col px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="relative">
                  <button
                    onClick={handleEdit}
                    className="absolute bottom-[24px] right-[70px]"
                  >
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <img
                    src={state.user?.photoURL}
                    alt={state.user?.name}
                    className="w-56 h-56 mx-auto object-contain rounded-full"
                  />
                  {loadingSpinner && (
                    <div className="absolute top-1/2 bottom-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">
                      <Loader color="bg-white" />
                    </div>
                  )}
                </div>
                {progress !== 0 ? (
                  <div className="w-full h-1 bg-white border rounded-full overflow-hidden mt-4">
                    <div className={`w-64 h-full bg-green-500 rounded-full`} />
                  </div>
                ) : (
                  ""
                )}
                <label
                  for="userpic"
                  className="flex flex-row justify-center space-x-2 mt-2 cursor-pointer bg-purple-700 hover:bg-purple-800 transition-all duration-300 ease-in-out font-bold text-white rounded-lg py-3"
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
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                      />
                    </svg>
                  </span>
                  <span>Change Photo</span>
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  name="userpic"
                  id="userpic"
                  className="sr-only"
                />
              </div>
            </div>
            <div className="">
              <div className="">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={onChangeInt}
                  disabled={!isEditing}
                  name="username"
                  id="username"
                  className={`${
                    isEditing && "ring-2 ring-purple-500"
                  } focus:outline-none mt-1 p-3 border border-gray-300  flex-1 block w-full  rounded-md sm:text-sm`}
                  placeholder="Your username"
                  ref={username}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                name="email"
                id="email"
                className="focus:ring-indigo-500 mt-1 p-3 focus:border-indigo-500  border border-gray-300  flex-1 block w-full  rounded-md sm:text-sm"
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              onClick={() => setIsEditing(!isEditing)}
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? "Save Change" : "Edit"}
            </button>
          </div>
        </div>
      </form>
      {state.isModalOpen && (
        <Modal>
          <CropImageModal selected={selected} setFile={setFile} />
        </Modal>
      )}
    </div>
  );
};

export default Settings;
