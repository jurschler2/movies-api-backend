/** Config for the Movies API application. */

require("dotenv").config();

const OMDB_API_KEY = process.env.OMDB_API_KEY || "";


module.exports = {
  OMDB_API_KEY
}