const express = require("express");
const Db = require("./db");
const route = express.Router();

route.get("api/posts", (req, res) => {
  Db.find()
    .then(res => {
      res.status(200).json(res);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving posts" });
    });
});

module.exports = route;
