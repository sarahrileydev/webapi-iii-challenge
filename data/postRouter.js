const express = require("express");

const Posts = require("./helpers/postDb");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

// Get Posts by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

// Post Posts

router.post("/", async (req, res) => {
  if (!req.body.text || !req.body.user_id) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide text and a user ID for the post."
      });
  } else {
    try {
      const post = await Posts.insert(req.body);
      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          error: "There was an error while saving the post to the database"
        });
    }
  }
});

// Put Posts by ID
router.put("/:id", async (req, res) => {
  if (!req.body.text || !req.body.user_id) {
    res
      .status(400)
      .json({ errorMessage: "We need a user AND some content, so add em!" });
  } else {
    try {
      const post = await Posts.update(req.params.id, req.body);

      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    }
  }
});

//Delete Post by ID
router.delete("/:id", async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);

    if (count > 0) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The post could not be removed" });
  }
});

module.exports = router;
