const FoodUser =
require("../models/FoodUser");

const bcrypt =
require("bcryptjs");

// GET ALL USERS

const getUsers =
async (req, res) => {

  try {

    const users =
    await FoodUser.find()

    .select("-password")

    .sort({
      createdAt: -1,
    });

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });

  }

};

// CREATE USER

const createUser =
async (req, res) => {

  try {

    const {
      username,
      password,
      role,
    } = req.body;

    const existingUser =
      await FoodUser.findOne({
        username,
      });

    if (existingUser) {

      return res.status(400)
      .json({

        message:
          "Username already exists",

      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await FoodUser.create({

        username,

        password:
          hashedPassword,

        role,

        active: true,

      });

    res.status(201)
    .json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });

  }

};

// UPDATE USER

const updateUser =
async (req, res) => {

  try {

    const user =
    await FoodUser.findById(
      req.params.id
    );

    if (!user) {

      return res.status(404)
      .json({

        message:
          "User not found",

      });

    }

    user.username =
      req.body.username ||
      user.username;

    user.role =
      req.body.role ||
      user.role;

    user.active =
      req.body.active;

    await user.save();

    res.json({

      message:
        "User updated",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });

  }

};

// DELETE USER

const deleteUser =
async (req, res) => {

  try {

    const user =
    await FoodUser.findById(
      req.params.id
    );
    if (
  user.role === "Admin"
) {

  return res.status(400)
  .json({

    message:
      "Admin cannot be deleted",

  });

}

    if (!user) {

      return res.status(404)
      .json({

        message:
          "User not found",

      });

    }

    await user.deleteOne();

    res.json({

      message:
        "User deleted",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });

  }

};

module.exports = {

  getUsers,

  createUser,

  updateUser,

  deleteUser,

};