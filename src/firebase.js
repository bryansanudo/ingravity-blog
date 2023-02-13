import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzFPiOcUUnFjkQsxSIHArSVNqxUDVginE",
  authDomain: "ingravity-roller.firebaseapp.com",
  projectId: "ingravity-roller",
  storageBucket: "ingravity-roller.appspot.com",
  messagingSenderId: "829130625517",
  appId: "1:829130625517:web:6ce5ec0f524124943c97e4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
