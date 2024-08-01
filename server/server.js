const express = require("express")
const { expressjwt: expressJWT } = require("express-jwt")
const bodyParser = require("body-parser")
const { secret_key, port } = require("./config.js")
const cors = require("cors")
const {
    loadJSON,
    registerNewUser,
    createToken,
    getAllUsers,
    findUser,
} = require("./utils/utils.js")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(
    expressJWT({
        secret: secret_key,
        algorithms: ["HS256"],
    }).unless({ path: ["/login", "/menu"] })
)

async function init() {
    try {
        routerList = await loadJSON("./routerList.json")
        routerListAdmin = await loadJSON("./routerListAdmin.json")
    } catch (err) {
        console.error("Error initializing data:", err)
    }
}

var routerList = []
var routerListAdmin = []
init()

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = findUser(username)

    if (user && password == user.password) {
        const token = createToken(user.username, user.role)
        const role = user.role
        res.json({ token, role })
    } else {
        res.status(401).send("Invalid credentials")
    }
})

app.post("/register", async (req, res) => {
    const { username, password, role } = req.body
    const existingUser = findUser(username)

    if (existingUser) {
        res.status(409).send("用户名已存在")
    } else {
        registerNewUser(username, password, role)
        res.send("注册成功")
    }
})

app.post("/routes", async (req, res) => {
    const { role } = req.body
    if (role == "admin") {
        res.send(routerListAdmin)
    } else {
        res.send(routerList)
    }
})

app.post("/users", async (req, res) => {
    const { role } = req.body
    if (role == "admin") {
        res.send(getAllUsers())
    } else {
        res.err(403).send("用户权限不足")
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
