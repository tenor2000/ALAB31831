const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res, next) => {
    const links = [
      {
        href: "comments/:id",
        rel: ":id",
        type: "GET",
      },
      {
        href: "comments",
        rel: "",
        type: "POST",
      },
      {
        href: "comments/:id",
        rel: ":id",
        type: "DELETE",
      },
    ];

    let userComments = comments;

    if (req.query.userId) {
      userComments = userComments.filter((c) => c.userId == req.query.userId);
    }

    if (req.query.postId) {
      userComments = userComments.filter((c) => c.postId == req.query.postId);
    }

    if (userComments.length > 0) {
      res.json({ userComments, links });
    } else {
      next(error(404, "No Comments Found"));
    }
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.postId && req.body.body) {
      const comment = {
        id: comments[comments.length - 1].id + 1,
        userId: req.body.userId,
        postId: req.body.postId,
        body: req.body.body,
      };

      comments.push(comment);
      res.json(comment);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const comment = comments.find((c) => c.id == req.params.id);
    if (comment) {
      res.json(comment);
    } else next(error(404, "Comment Not Found"));
  })
  .patch((req, res, next) => {
    const comment = comments.find((c, i) => {
      if (c.id == req.params.id) {
        for (const key in req.body) {
          comments[i][key] = req.body[key];
        }
        return true;
      }
    });
    if (comment) res.json(comment);
    else next(error(404, "Comment Not Found"));
  })
  .delete((req, res, next) => {
    const comment = comments.find((c, i) => {
      if (c.id == req.params.id) {
        comments.splice(i, 1);
        return true;
      }
    });
    if (comment) res.json(comment);
    else next(error(404, "Comment Not Found"));
  });

module.exports = router;
