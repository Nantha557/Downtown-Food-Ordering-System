const FcmToken =
require("../models/FcmToken");

const saveToken =
async (req,res) => {

  try {

    const { role, token } =
    req.body;

    await FcmToken.findOneAndUpdate(

      { role },

      { token },

      { upsert:true }

    );

    res.json({
      success:true
    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({
      message:"Failed"
    });

  }

};

module.exports = {
  saveToken,
};