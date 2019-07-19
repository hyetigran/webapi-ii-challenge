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
        res.status(200).json({ message: "The post has been nuked" });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error removing the post"
      });
    });
});

route.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  Db.findById(postId)
    .then(post => {
      //console.log("post", post);
      Db.findPostComments(post[0].id)
        .then(result => {
          // console.log("happy path");
          // console.log(result);
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

route.get("/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  //console.log("commentID", commentId);
  Db.findById(postId)
    .then(res => {
      // console.log("here", res);
      Db.findCommentById(commentId)
        .then(result => {
          //console.log("happy path");
          //console.log(result);
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
  const { params, body } = req;
  Db.findById(params.id)
    .then(result => {
      console.log(result[0].id);
      if (result[0].id > 0) {
        if (body.text) {
          const commentText = { ...body, post_id: params.id };
          Db.insertComment(commentText)
            .then(result => {
              console.log("happy path");
              console.log(result);
              res.status(201).json(body);
            })
            .catch(err => {
              res.status(404).json({ errorMessage: "Can't find that id!" });
            });
        } else {
          res.status(400).json({
            errorMessage: "Please provide text for the comment."
          });
        }
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Can't find the comment in the post" });
    });
});

// Thanks for the great example Johnson!
// route.post("/:id/comments", async (req, res) => {
//   const { params, body } = req;
//   try {
//     const post = await db.findById(params.id);
//     if (post.length > 0) {
//       if (body.text) {
//         const commentData = { ...body, post_id: params.id };
//         const comment = await db.insertComment(commentData);
//         res.json({
//           comment
//         });
//       } else {
//         res.status(400).json({
//           errorMessage: "Please provide text for the comment."
//         });
//       }
//     } else {
//       res.status(404).json({
//         message: "The post with the specified ID does not exist."
//       });
//     }
//   } catch (err) {}
// });

module.exports = route;
