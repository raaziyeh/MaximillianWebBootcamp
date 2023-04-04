const express = require("express")

const app = express()

app.get("/currenttime", function (req, res) {
	res.send(
		`<h1>From express server code:) current time is ${new Date().toUTCString()} </h1>`
	)
})

app.get("/", function (req, res) {
	res.send("<h1>Hello to ExpressJS Backend World:) </h1>")
})

app.listen(3000)
