const MenuItem =
  require("../models/MenuItem");

// GET ALL ITEMS

const getMenuItems =
  async (req, res) => {

    try {

      const items =
        await MenuItem.find();

      res.json(items);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch menu",
      });

    }

  };

// ADD ITEM

const addMenuItem =
  async (req, res) => {

    try {

      const item =
        await MenuItem.create(
          req.body
        );

      res.status(201).json(
        item
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to add item",
      });

    }

  };

// UPDATE ITEM

const updateMenuItem =
  async (req, res) => {

    try {

      const item =
        await MenuItem.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      res.json(item);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Update failed",
      });

    }

  };

// DELETE ITEM

const deleteMenuItem =
  async (req, res) => {

    try {

      await MenuItem.findByIdAndDelete(

        req.params.id

      );

      res.json({
        message:
          "Item deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Delete failed",
      });

    }

  };

module.exports = {

  getMenuItems,

  addMenuItem,

  updateMenuItem,

  deleteMenuItem,

};