import { initializeApp } from "firebase/app";
import API
from "./services/api";

import {
  getMessaging,
  getToken,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDDYJvXEzgRcZv0xKStNL7FOnFkkf-KHI8",
  authDomain: "downtown-food-ordering.firebaseapp.com",
  projectId: "downtown-food-ordering",
  storageBucket: "downtown-food-ordering.firebasestorage.app",
  messagingSenderId: "649163376700",
  appId: "1:649163376700:web:073178751fbc7aebb05b39",
};

const app =
  initializeApp(
    firebaseConfig
  );

export const messaging =
  getMessaging(app);

export const requestNotificationPermission =
  async () => {

    const permission =
      await Notification.requestPermission();

    if (
      permission === "granted"
    ) {

      const token =
        await getToken(
          messaging,
          {
            vapidKey:
              "BPvdkZQlOPven3bmajZJVoAHLyCNENT7LXIMuROVmciuwQZlS8r02PbJDCtFlrnlaQMzsBskEPHDYJ1am9o7mnk",
          }
        );

      console.log(
  "FCM Token:",
  token
);

const role =
localStorage.getItem(
  "role"
);

if (role) {

  await API.post(
    "/fcm/register",
    {
      role,
      token,
    }
  );

}

return token;
    }

    return null;
  };