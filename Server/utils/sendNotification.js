const admin =
require("../config/firebase");

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

    console.log(
      "Notification Sent"
    );

  }

  catch(error){

    console.log(error);

  }

};

module.exports =
sendNotification;