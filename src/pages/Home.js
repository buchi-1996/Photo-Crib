import React, { useEffect, useState } from "react";
import {
  collection,
  // doc,
  getDocs,
  getFirestore,
  // query,
  orderBy,
} from "firebase/firestore";
import app from "../lib/firebase";
import ImgCard from "../components/ImgCard";
import Loader from "../components/loader/Loader";
// import Loader from "../components/Loader/Loader";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myError, setMyError] = useState("");
  const db = getFirestore(app);

  console.log(db);

  useEffect(() => {
    const getData = async () => {
      // setIsLoading(true);
      try {
        const querySnapshot = await getDocs(
          collection(db, "Photos"),
          orderBy("createdAt", "desc")
        );
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPhotos(data);
        console.log(data);
        setIsLoading(false);
        if (!data.length) {
          throw new Error("Failed to fetch Items");
        }
      } catch (err) {
        console.log(err);
        console.log(typeof err);
        setMyError(err);
        setIsLoading(false);
      }
    };
    return () => getData();
  }, [db, isLoading]);

  const handleReload = () => {
    setIsLoading(true)
  }

  return (
    <section>
      <div className="h-[50vh] flex flex-col items-center justify-center bg-gray-50">
        <div className=" container mx-auto flex flex-col items-center justify-center">
          <h1 className="font-bold text-xl text-center md:text-3xl">Search your Images Here</h1>
          <div className="flex flex-row focus:ring-1 focus:ring-purple-500 rounded-lg overflow-hidden my-5 items-center w-full bg-white h-14 max-w-3xl">
            <input
              type="text"
              placeholder="Search Image"
              className="flex-1 focus:outline-none h-full px-5"
            />
            <button className="flex-none bg-purple-700 font-medium hover:bg-purple-800 border-none h-full px-6 text-white ">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10">
        <div>
          {isLoading ? (
            <div className="flex flex-row items-center justify-center"><Loader color='bg-purple-500' /></div>
          ) : myError ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <img src="../../../undraw_signal_searching_re_yl8n.svg" alt="" className="w-44 h-44"/>
              <p className="text-center mt-24">Failed to fetch from database</p>
              <button onClick={handleReload} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Retry</button>
            </div>
          ) : (
            <div className="grid xs:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {photos.map((photo) => {
                return <ImgCard key={photo.id} {...photo} />;
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
