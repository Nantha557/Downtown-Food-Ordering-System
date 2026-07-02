const admin =
require("../config/firebase");

if (!admin) {

  module.exports = async () => {

    console.log(
      "Firebase disabled. Notification skipped."
    );

  };

  return;

}

const sendNotification =
async (
  token,
  title,
  body
) => {

  try {

    await admin
      .messaging()
      .send({

        token,

        notification: {
          title,
          body,
        },

      });

  }

  catch(error){

    console.log(
      "Notification Error:",
      error
    );

  }

};

module.exports =
sendNotification;