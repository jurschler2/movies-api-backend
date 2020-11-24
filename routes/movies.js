const express = require("express");
const Movie = require("../models");

const router = new express.Router();

router.get("/", async function(req, res, next) {

  try {

    console.log("This is working");
    return res.json({"hello": "there"})

  } catch (err) {

  }

});

router.post("/", async function(req, res, next) {

  try {

  } catch (err) {

  }

});

router.get("/:id", async function(req, res, next) {

  try {

  } catch (err) {

  }

});

router.post("/:id/upvote", async function(req, res, next) {

  try {

  } catch (err) {

  }

});

router.get("/:id/downvote", async function(req, res, next) {

  try {

  } catch (err) {

  }

});

router.get("/omdb/search/:title", async function(req, res, next) {

  try {
    
    let searchWord = req.params.title;
    let movies = await Movie.searchOMDB(searchWord);
    return res.json({"movies": movies});

  } catch (err) {

  }

});

router.get("/omdb/:id", async function(req, res, next) {

  try {

    let imdbID = req.params.id;
    let movie = await Movie.getDetailsOMDB(imdbID);
    return res.json({"movie": movie});

  } catch (err) {

  }

});

module.exports = router;
