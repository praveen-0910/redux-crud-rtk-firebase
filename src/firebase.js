import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABcinMrZWNPJpt6pIJ5xnbGENRq7Lu0aY",
  authDomain: "react-redux-297e7.firebaseapp.com",
  projectId: "react-redux-297e7",
  storageBucket: "react-redux-297e7.appspot.com",
  messagingSenderId: "547152324758",
  appId: "1:547152324758:web:57d33b8efc14f596e8bab7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
