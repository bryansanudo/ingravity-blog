import { useState } from "react";
import { db, auth } from "@/firebase";
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export const useFirestore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});

  const getData = async () => {
    //console.log(auth.currentUser);
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const querySnapshot = await getDocs(collection(db, "urls"));
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  const getNames = async () => {
    try {
      setLoading(true);
      const dataRef = collection(db, "names");
      const q = query(dataRef, where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => doc.data());

      return dataDB[0].name;
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const bbb = await getNames();

      const newDoc = {
        enabled: true,
        name: bbb,
        nanoid: nanoid(6),
        origin: url,
        uid: auth.currentUser.uid,
      };

      const docRef = doc(db, "urls", newDoc.nanoid);
      await setDoc(docRef, newDoc);
      setData([...data, newDoc]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  const deleteData = async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, [nanoid]: true }));
      const docRef = doc(db, "urls", nanoid);
      await deleteDoc(docRef);
      setData(data.filter((item) => item.nanoid !== nanoid));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };

  const updateData = async (nanoid, newOrigin) => {
    try {
      setLoading((prev) => ({ ...prev, updateData: true }));
      const docRef = doc(db, "urls", nanoid);
      await updateDoc(docRef, { origin: newOrigin });
      setData(
        data.map((item) =>
          item.nanoid === nanoid ? { ...item, origin: newOrigin } : item
        )
      );
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, updateData: false }));
    }
  };

  return {
    data,
    error,
    loading,
    getData,
    addData,
    deleteData,
    updateData,
  };
};
