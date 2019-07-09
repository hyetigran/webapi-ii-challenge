const express = require("express");
const postsRoutes = require("./post-routes");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRoutes);

server.listen(5000, () => {
  console.log("\n*** Server Running on http://localhost:5000 ***\n");
});
