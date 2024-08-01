const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    secret_key: process.env.secret_key, // "test_secretkey"
    port: process.env.port, // 3000
}
