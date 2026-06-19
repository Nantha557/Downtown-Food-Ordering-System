importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDDYJvXEzgRcZv0xKStNL7FOnFkkf-KHI8",
  authDomain:
    "downtown-food-ordering.firebaseapp.com",
  projectId:
    "downtown-food-ordering",
  storageBucket:
    "downtown-food-ordering.firebasestorage.app",
  messagingSenderId:
    "649163376700",
  appId:
    "1:649163376700:web:073178751fbc7aebb05b39",
});

const messaging =
  firebase.messaging();

messaging.onBackgroundMessage(
  (payload) => {

    self.registration.showNotification(
      payload.notification.title,
      {
        body:
          payload.notification.body,
        icon:
          "/icon-192.png",
      }
    );

  }
);