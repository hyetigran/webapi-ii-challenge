const express = require("express");
const Db = require("./data/db");
const route = express.Router();

route.get("/", (req, res) => {
  Db.find()
    .then(res => {
      res.status(200).json(res);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving posts" });
    });
});

route.get("/:id", (req, res) => {
  const id = req.params.id;
  Db.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving the post" });
    });
});

route.post("/", (req, res) => {
  const post = req.body;
  Db.insert(post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding the post"
      });
    });
});

route.put("/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;
  Db.update(id, post)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating the post"
      });
    });
});

route.delete("/:id", (req, res) => {
  Db.remove(req.params.id)
    .then(res.status(200).json({ message: "Post was removed" }))
    .catch(err => {
      res.status(500).json({
        message: "Error removing the post"
      });
    });
});
module.exports = route;
