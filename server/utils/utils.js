const fs = require("fs")
const { secret_key } = require("../config")
const jwt = require("jsonwebtoken")
const { insertDB, searchDB, findAllUsers } = require("./database")

// async function registerNewUser(username, password, role) {
//     // 读取JSON文件
//     fs.readFile("userAcc.json", "utf8", (err, fileContents) => {
//         if (err) {
//             console.error("Error reading file:", err)
//             reject(err)
//         }
//         try {
//             // 解析JSON数据
//             let data = JSON.parse(fileContents)

//             // 创建新对象
//             const newUser = {
//                 username: username,
//                 password: password,
//                 role: role,
//             }

//             // 将新对象添加到数组中
//             data.push(newUser)
//             data = JSON.stringify(data)

//             // 写入更新后的数据到文件
//             fs.writeFileSync("userAcc.json", data, "utf8", (err) => {
//                 if (err) {
//                     console.error("Error writing file:", err)
//                 } else {
//                     console.log("Data appended to file successfully!")
//                 }
//             })
//         } catch (err) {
//             console.error("Error parsing JSON:", err)
//         }
//     })
// }

async function loadJSON(file_path) {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, "utf8", (err, fileContents) => {
            if (err) {
                console.error("Error reading file:", err)
                reject(err)
                return
            }
            try {
                const data = JSON.parse(fileContents)
                // console.log("File data:", data)
                resolve(data)
            } catch (err) {
                console.error("Error parsing JSON:", err)
                reject(err)
            }
        })
    })
}

function createToken(username, role) {
    return jwt.sign({ username: username, role: role }, secret_key, {
        expiresIn: "10m",
    })
}

function registerNewUser(username, password, role) {
    insertDB(username, password, role)
}

function getAllUsers() {
    return findAllUsers()
}

function findUser(username) {
    return searchDB(username)
}

module.exports = {
    createToken,
    registerNewUser,
    getAllUsers,
    findUser,
    loadJSON,
}
