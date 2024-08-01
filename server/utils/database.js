const Database = require("better-sqlite3")
const db = new Database("./userdb.db") // { verbose: console.log }

const insertStmt = db.prepare(`
    INSERT INTO users (username, password, role) VALUES (?, ?, ?);
  `)

const findAllStmt = db.prepare("SELECT * FROM users")

const selectStmt = db.prepare("SELECT * FROM users WHERE username = ?")

const deleteStmt = db.prepare("DELETE FROM users WHERE username = ?")

function insertDB(username, password, role) {
    insertStmt.run([username, password, role])
}

function findAllUsers() {
    let rows = findAllStmt.all()
    return rows
}

function searchDB(username) {
    let rows = selectStmt.get([username])
    return rows
}

function deleteUser(username) {
    deleteStmt.run([username])
}

module.exports = {
    insertDB,
    findAllUsers,
    searchDB,
    deleteUser,
}
