const FoodUser =
require("../models/FoodUser");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const login =
async (req, res) => {

  try {

    const {
      username,
      password,
    } = req.body;

    const user =
      await FoodUser.findOne({
        username,
      });

    if (!user) {

      return res.status(401)
      .json({

        message:
          "Invalid Username",

      });

    }

    if (!user.active) {

      return res.status(403)
      .json({

        message:
          "Account Disabled",

      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401)
      .json({

        message:
          "Invalid Password",

      });

    }

    const token =
      jwt.sign(

        {
          id: user._id,
          role: user.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }

      );

    res.json({

      token,

      role:
        user.role,

      username:
        user.username,

    });

  } catch (error) {

    console.log(error);

    res.status(500)
    .json({

      message:
        "Server Error",

    });

  }

};

module.exports = {
  login,
};