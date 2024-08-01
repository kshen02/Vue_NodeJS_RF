const Database = require("better-sqlite3")
const db = new Database("./userdb.db") // { verbose: console.log }

const createTable = db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);`)

createTable.run()
