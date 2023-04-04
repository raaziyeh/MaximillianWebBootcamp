const fs = require("fs")

const path = require("path")

const express = require("express")

const app = express()

app.use(express.urlencoded({ extended: false }))

app.get("/currenttime", function (req, res) {
	res.send(
		`<h1>From express server code:) current time is ${new Date().toUTCString()} </h1>`
	)
})

app.get("/", function (req, res) {
	res.send(
		'<form action="/store-user" method="POST"><label>Your Name: </label><input type="text" name="username"><button>Submit</button></form>'
	)
})

app.post("/store-user", function (req, res) {
	const userName = req.body.username
	const filePath = path.join(__dirname, "data", "users.json")
	const usersData = JSON.parse(fs.readFileSync(filePath))
	usersData.push(userName)
	fs.writeFileSync(filePath, JSON.stringify(usersData))
	res.send("<h1>Username stored!</h1>")
})

app.get("/users", function (req, res) {
	const filePath = path.join(__dirname, "data", "users.json")
	const usersData = JSON.parse(fs.readFileSync(filePath))
	let usersHTML = ""
	for (user of usersData) {
		usersHTML += `<li>Welcome ${user}</li>`
	}
	res.send(`<ul>${usersHTML}</ul>`)
})

app.listen(3000)
