const path = require("path")
const fs = require("fs")

const express = require("express")

const app = express()

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false}))

app.get("/", function (req, res) {
	const htmlFilePath = path.join(__dirname, "views", "index.html")
	res.sendFile(htmlFilePath)
})

app.get("/about", function (req, res) {
	const htmlFilePath = path.join(__dirname, "views", "about.html")
	res.sendFile(htmlFilePath)
})

app.get("/confirm", function (req, res) {
	const htmlFilePath = path.join(__dirname, "views", "confirm.html")
	res.sendFile(htmlFilePath)
})

app.get("/recommend", function (req, res) {
	const htmlFilePath = path.join(__dirname, "views", "recommend.html")
	res.sendFile(htmlFilePath)
})

app.post("/recommend", function(req, res) {
	const restaurant = req.body
	const filePath = path.join(__dirname, 'data', 'restaurants.json')
	const fileData = fs.readFileSync(filePath)
	const restaurantsData = JSON.parse(fileData)
	restaurantsData.push(restaurant)
	fs.writeFileSync(filePath, JSON.stringify(restaurantsData))
	res.redirect('/confirm')
})

app.get("/restaurants", function (req, res) {
	const htmlFilePath = path.join(__dirname, "views", "restaurants.html")
	res.sendFile(htmlFilePath)
})

app.listen(3000)
