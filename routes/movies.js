const express = require("express");
const Movie = require("../models");

const router = new express.Router();

router.get("/", async function(req, res, next) {

  try {

    let movies = await Movie.getAll();
    return res.json({"movies": movies});

  } catch (err) {

    console.log("Failed getting all movies");

  }

});

router.post("/", async function(req, res, next) {

  try {

    let {imdbID, title, year, director, plot, poster} = req.body;
    let movie = await Movie.create({imdbID, title, year, director, plot, poster})
    return res.json({"movie": movie});

  } catch (err) {

    console.log("Failed posting a movie");

  }

});

router.get("/:id", async function(req, res, next) {

  try {

    let imdbID = req.params.id;
    let movie = await Movie.get(imdbID);
    return res.json({"movie": movie});

  } catch (err) {

    console.log("Failed getting a movie");

  }

});

router.post("/:id/upvote", async function(req, res, next) {

  try {

    let imdbID = req.params.id;
    let vote = await Movie.upvote(imdbID);
    return res.json({"upvote": vote});

  } catch (err) {

    console.log("Failed upvoting a movie");

  }

});

router.post("/:id/downvote", async function(req, res, next) {

  try {

    let imdbID = req.params.id;
    let vote = await Movie.downvote(imdbID);
    return res.json({"downvote": vote});

  } catch (err) {

    console.log("Failed downvoting a movie");

  }

});

router.get("/omdb/search/:title", async function(req, res, next) {

  try {
    
    let searchWord = req.params.title;
    let movies = await Movie.searchOMDB(searchWord);
    return res.json({"movies": movies});

  } catch (err) {

    console.log("Failed searching OMDB for a movie");

  }

});

router.get("/omdb/:id", async function(req, res, next) {

  try {

    let imdbID = req.params.id;
    let movie = await Movie.getDetailsOMDB(imdbID);
    return res.json({"movie": movie});

  } catch (err) {

    console.log("Failed getting a movie from OMDB");

  }

});

module.exports = router;


// Inception: {"imdbID": "tt1375666", "title": "Inception", "year": 2010, "director": "Christopher Nolan", "plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"}
// Jurassic Park: {"imdbID": "tt0107290", "title": "Jurassic Park", "year": 1993, "director": "Steven Spielberg", "plot": "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.", "poster": "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg"}