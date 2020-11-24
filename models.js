/** Database model classes for the Movies API */

const db = require("./db");
const { OMDB_API_KEY } = require("./config");
const OMDB_BASE_URL = "http://www.omdbapi.com/?";

/** Movie on the site. */

class Movie {

  static async create({imdbID, title, year, director, plot, poster}) {
    const result = await db.query(
      `INSERT INTO movies (
            imdbID,
            title,
            year,
            director,
            plot,
            poster)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING imdbID, title, year, director, plot, poster, upvote, downvote`,
      [imdbID, title, year, director, plot, poster]);

  return result.rows[0];

  }

  static async get(imdbID) {

  }

  static async getAll() {

  }

  static async upvote(imdbID) {

  }

  static async downvote(imdbID) {

  }

  static async searchOMDB(title) {

  }

  static async getDetailsOMDB(title) {

  }

}

module.exports = Movie;