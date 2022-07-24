import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import app from "../lib/firebase";
import Error from "../components/Error";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [errMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const type = ["image/png", "image/jpeg"];
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const checkInput = downloadURL === "" || title === "" || desc === "";

  // =============================================
  // Get Image File
  // =============================================
  const handleFileUpload = (e) => {
    const selected = e.target.files[0];

    if (selected && type.includes(selected.type)) {
      setFile(selected);
    } else {
      setError("Please select an Image file (png or jpeg)");
      setFile(null);
      setProgress(0);
    }
  };

  useEffect(() => {
    uploadFile(file);
  }, [file]);

  const uploadFile = (file) => {
    if (!file) return;
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setDownloadURL(downloadURL);
        });
      }
    );
  };

  // Add Image File =========================
  const addImageDoc = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    const imageDoc = collection(db, "Photos");
    
    try {
      if (checkInput) {
        setErrorMessage("please check fields");
      } else {
        const docRef = await addDoc(imageDoc, {
          Title: title,
          Photo: downloadURL,
          Description: desc,
          createdAt: serverTimestamp()
        });

        setFile(null);
        setTitle("");
        setDesc("");
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="w-full max-w-3xl mx-auto">
        <h4 className=" font-bold text-2xl mb-5 text-purple-500">
          Upload Image {progress + "%"}
        </h4>
        {errMessage && (
          <Error
            errColor="bg-red-500"
            border="border-red-500"
            errMessage={errMessage}
          />
        )}
        <form onSubmit={addImageDoc}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <div className="flex flex-row justify-between items-center text-sm">
                  <label className="block text-sm font-medium text-gray-700">
                    photo
                  </label>
                  {file ? (
                    <p>{file.name}</p>
                  ) : (
                    <p className="text-red-500">{error}</p>
                  )}
                </div>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          onChange={handleFileUpload}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="">
                  <label
                    htmlFor="img-title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="img-title"
                    id="img-title"
                    className="focus:ring-indigo-500 mt-1 p-3 focus:border-indigo-500  border border-gray-300  flex-1 block w-full  rounded-md sm:text-sm"
                    placeholder="www.example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="desc"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    id="desc"
                    name="desc"
                    rows={3}
                    className="shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="image details"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description for your Image.
                </p>
              </div>

              {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Change
                      </button>
                    </div>
                  </div> */}
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
