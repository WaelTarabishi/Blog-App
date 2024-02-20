import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_API_KEY,
  authDomain: "mern-blog-6876f.firebaseapp.com",
  projectId: "mern-blog-6876f",
  storageBucket: "mern-blog-6876f.appspot.com",
  messagingSenderId: "1007449704335",
  appId: "1:1007449704335:web:c2e94f788a37c4d95dedfa",
};

export const app = initializeApp(firebaseConfig);
