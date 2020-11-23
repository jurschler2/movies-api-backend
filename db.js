/** Database connection for Movies API */

const { Client } = require("pg");

const client = new Client(process.env.DATABASE_URL || "postgresql:///movies_api");

client.connect();

module.exports = client;