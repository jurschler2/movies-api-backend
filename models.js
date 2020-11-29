/** Database model classes for the Movies API */

const db = require("./db");
const axios = require("axios");
const { OMDB_API_KEY } = require("./config");
const OMDB_BASE_URL = "http://www.omdbapi.com/?";

/** Movie on the site. */

class Movie {

  static async create({imdbID, title, year, director, plot, poster}) {
    const result = await db.query(
      `INSERT INTO movies (
            "imdbID",
            title,
            year,
            director,
            plot,
            poster)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING "imdbID", title, year, director, plot, poster, upvote, downvote`,
      [imdbID, title, year, director, plot, poster]);

    return result.rows[0];
  }

  static async get(imdbID) {
    const result = await db.query(
      `SELECT "imdbID",
              title,
              year,
              director,
              plot,
              poster,
              upvote,
              downvote
        FROM movies
        WHERE "imdbID" = $1`,
        [imdbID]);

    return result.rows[0];
  }

  static async getAll() {
    const result = await db.query(
      `SELECT "imdbID",
              title,
              year,
              director,
              plot,
              poster,
              upvote,
              downvote
        FROM movies`);

    return result.rows;
  }

  static async upvote(imdbID) {
    const result = await db.query(
      `UPDATE movies
       SET upvote=upvote + 1
       WHERE "imdbID" = $1
       RETURNING upvote`,
       [imdbID]);
    
    return result.rows[0];
  }

  static async downvote(imdbID) {
    const result = await db.query(
      `UPDATE movies
       SET downvote=downvote - 1
       WHERE "imdbID" = $1
       RETURNING downvote`,
       [imdbID]);
    
    return result.rows[0];
  }

  static async searchOMDB(title) {

    try {
      
      const result = await axios.get(`${OMDB_BASE_URL}apikey=${OMDB_API_KEY}&s=${title}`);
      return result.data.Search;

    } catch (err) {

      console.log("Failed to search OMDB");

    }

  }

  static async getDetailsOMDB(imdbID) {
    try {

      const result = await axios.get(`${OMDB_BASE_URL}apikey=${OMDB_API_KEY}&i=${imdbID}`);
      return result.data;

    } catch (err) {

      console.log("Failed to get a movie from OMDB");

    }

  }

}

module.exports = Movie;