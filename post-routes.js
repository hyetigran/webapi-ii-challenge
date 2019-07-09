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
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating the post"
      });
    });
});

route.delete("/:id", (req, res) => {
  Db.remove(req.params.id)
    .then(res => {
      if (res) {
        res.status(200).json({ message: "The hub has been nuked" });
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error removing the post"
      });
    });
});

//route.get("/:id", (req, res) => {});

route.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  Db.findById(postId)
    .then(id => {
      console.log("id", id);
      Db.findPostComments(id)
        .then(result => {
          console.log("happy path");
          console.log(result);
          res.status(200).json(result);
        })
        .catch(err => {
          res.status(404).json({ errorMessage: "Can't find that id!" });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Can't find the comment in the post" });
    });
});

route.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  Db.findById(postId)
    .then(id => {
      Db.findCommentById(id)
        .then(result => {
          console.log("happy path");
          console.log(result);
          res.status(200).json(result);
        })
        .catch(err => {
          res.status(404).json({ errorMessage: "Can't find that id!" });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Can't find the comment in the post" });
    });
});

route.post("/:id/comments", (req, res) => {
  const postId = req.params.id;
  Db.findById(postId)
    .then(id => {
      Db.insertComment(req.body)
        .then(result => {
          console.log("happy path");
          console.log(result);
          res.status(200).json(result);
        })
        .catch(err => {
          res.status(404).json({ errorMessage: "Can't find that id!" });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Can't find the comment in the post" });
    });
});

module.exports = route;
