// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore setup
const db = getFirestore(app);

// Authentication setup
const auth = getAuth(app);

// Initialize Firebase emulator
{
  const isDev = import.meta.env.VITE_IS_DEV === 'true';
  if (isDev) {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, `http://localhost:9099`);
    console.log('Using Firebase emulator');
  } else {
    console.warn('CAUTION: Using production database');
  }
}

export { db, auth };

// // Add a document
// export async function addData(data: string) {
//   const docRef = await addDoc(collection(db, 'game_data'), {
//     data,
//     createdAt: serverTimestamp(),
//   });
//   console.log('Document written with ID:', docRef.id);
// }

// // Fetch documents
// export async function fetchData(): Promise<string[]> {
//   const querySnapshot = await getDocs(collection(db, 'game_data'));
//   const data = querySnapshot.docs.map((doc) => doc.data().data);
//   return data;
// }
