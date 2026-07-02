const admin = require("firebase-admin");

if (
  !process.env.FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_CLIENT_EMAIL ||
  !process.env.FIREBASE_PRIVATE_KEY
) {

  console.log(
    "⚠ Firebase disabled (Local Development)"
  );

  module.exports = null;

  return;

}

const serviceAccount = {

  projectId:
    process.env.FIREBASE_PROJECT_ID,

  clientEmail:
    process.env.FIREBASE_CLIENT_EMAIL,

  privateKey:
    process.env.FIREBASE_PRIVATE_KEY.replace(
      /\\n/g,
      "\n"
    ),

};

if (!admin.apps.length) {

  admin.initializeApp({

    credential:
      admin.credential.cert(
        serviceAccount
      ),

  });

}

module.exports = admin;