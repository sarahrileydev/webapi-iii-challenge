const express = require("express");
const Users = require("./helpers/userDb");
const router = express.Router();

const upperCaseNameCheck = (req, res, next) => {
  if (!req.body.name) {
    res
      .status(400)
      .json({
        errorMessage: "Everybody has a name, and we need yours to function."
      });
  } else {
    req.body.name = req.body.name.toUpperCase();
    next();
  }
};

// Get user
router.get("/", async (req, res) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({
          message:
            "This is not the user you're looking for. The user with the specified ID does not exist."
        });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The user information could not be retrieved." });
  }
});

// Get user posts by id
router.get("/:id/posts", async (req, res) => {
  try {
    const user = await Users.getUserPosts(req.params.id);

    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({
          message:
            "This is not post you're looking for. The user with the specified ID does not exist."
        });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The user information could not be retrieved." });
  }
});

// Post Posts
router.post("/", upperCaseNameCheck, async (req, res) => {
  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong while saving user." });
  }
});

// Update Post by ID
router.put("/:id", upperCaseNameCheck, async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({
          message:
            "This is not the post you're looking for. The user with the specified ID does not exist."
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong, unable to update." });
  }
});

//Delete Post by ID
router.delete("/:id", async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);

    if (count > 0) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({
          message:
            "This is not the user you're looking for. The user with the specified ID does not exist."
        });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "User cannot be removed, make sure all posts have been deleted."
      });
  }
});

module.exports = router;
