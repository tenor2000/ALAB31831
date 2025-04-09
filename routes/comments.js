const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

router.route("/").get((req, res) => {
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

  res.json({ comments, links });
});

module.exports = router;
