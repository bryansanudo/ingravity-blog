import { useState } from "react";
import { db, auth } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";

export const useFirestoreName = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});

  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));

      const newDoc = {
        nanoid: nanoid(6),
        name: url,
        uid: auth.currentUser.uid,
      };

      const docRef = doc(db, "names", newDoc.nanoid);

      await setDoc(docRef, newDoc);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  return {
    error,
    loading,

    addData,
  };
};
