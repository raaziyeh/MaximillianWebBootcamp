const path = require("path")
const fs = require("fs")

const express = require("express")
const uuid = require("uuid")

const storedRestaurantData = require("./utils/restaurant-data")

const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.static("public"))

app.use(express.urlencoded({ extended: false }))

app.get("/", function (req, res) {
	res.render("index")
})

app.get("/about", function (req, res) {
	res.render("about")
})

app.get("/confirm", function (req, res) {
	res.render("confirm")
})

app.get("/recommend", function (req, res) {
	res.render("recommend")
})

app.post("/recommend", function (req, res) {
	const restaurant = req.body
	restaurant.id = uuid.v4()
	const restaurantsData = storedRestaurantData.getStoredRestaurants()
	restaurantsData.push(restaurant)
	storedRestaurantData.storeRestaurants(restaurantsData)
	res.redirect("/confirm")
})

app.get("/restaurants", function (req, res) {
	const restaurantsData = storedRestaurantData.getStoredRestaurants()
	res.render("restaurants", {
		numberOfRestaurants: restaurantsData.length,
		restaurants: restaurantsData,
	})
})

app.get("/restaurants/:id", function (req, res) {
	const restaurantId = req.params.id
	const restaurantsData = storedRestaurantData.getStoredRestaurants()
	for (const restaurant of restaurantsData) {
		if (restaurant.id === restaurantId) {
			res.render("restaurant-detail", { rid: restaurantId, restaurant })
			break
			// The following is the course's code, using return for break functionality
			// return res.render("restaurant-detail", { rid: restaurantId, restaurant })
		}
	}
	res.status(404).render("404")
})

app.use(function(req, res) {
	res.status(404).render("404")
})

app.use(function (error, req, res, next) {
	res.status(500).render("500")
})

app.listen(3000)
