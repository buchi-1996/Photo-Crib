import React, { useEffect, useState } from "react";
import {
  collection,
  // doc,
  getDocs,
  getFirestore,
  // query,
  orderBy
} from "firebase/firestore";
import app from "../lib/firebase";
import ImgCard from "../components/ImgCard";
// import Loader from "../components/Loader/Loader";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const db = getFirestore(app);
  console.log(db)

  console.log(isLoading);

  useEffect(() => {
    const getData = async () => {
      // setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "Photos"), orderBy('createdAt', 'desc'));
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPhotos(data);
        console.log(data);
        setIsLoading(false);
      } catch (e) {
        console.log('error:', e);
        setIsLoading(false);
      }
    };
    return () => getData();
  }, [db]);

  return (
    <section>
      <div className="h-[50vh] flex flex-col items-center justify-center bg-gray-50">
        <div className=" container mx-auto flex flex-col items-center justify-center">
          <h1 className="font-bold text-3xl">Search your Images Here</h1>
          <div className="flex flex-row my-5 items-center w-full bg-white rounded overflow-hidden h-14 max-w-3xl">
            <input
              type="text"
              placeholder="Search Image"
              className="flex-1 outline-10 outline-purple-900 h-full px-5"
            />
            <button className="bg-purple-700 font-medium hover:bg-purple-800 border-none h-full w-24 text-white ">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10">
      <div>
      {isLoading ? (
        <h1>Loding...</h1>
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
