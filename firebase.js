
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBtbejv1eETVo3GaibfC-kr3Qdgbme_Zdk",
    authDomain: "signal-clone-8b02e.firebaseapp.com",
    projectId: "signal-clone-8b02e",
    storageBucket: "signal-clone-8b02e.appspot.com",
    messagingSenderId: "452881925147",
    appId: "1:452881925147:web:1c49a7fed51b55f128a4be"
  };


const app = initializeApp(firebaseConfig)

const db=getFirestore(app)
const auth = getAuth(app);

export {db,auth}