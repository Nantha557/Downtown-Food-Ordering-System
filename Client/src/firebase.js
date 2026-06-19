import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDDYJvXEzgRcZv0xKStNL7FOnFkkf-KHI8",
  authDomain: "downtown-food-ordering.firebaseapp.com",
  projectId: "downtown-food-ordering",
  storageBucket: "downtown-food-ordering.firebasestorage.app",
  messagingSenderId: "649163376700",
  appId: "1:649163376700:web:073178751fbc7aebb05b39",
};

const app = initializeApp(firebaseConfig);

export default app;