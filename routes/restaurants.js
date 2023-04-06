const fs = require("fs")
const path = require("path")

const express = require("express")
const uuid = require("uuid")

const storedRestaurantData = require("../utils/restaurant-data")

const router = express.Router()

router.get("/confirm", function (req, res) {
	res.render("confirm")
})

router.get("/recommend", function (req, res) {
	res.render("recommend")
})

router.post("/recommend", function (req, res) {
	const restaurant = req.body
	restaurant.id = uuid.v4()
	const restaurantsData = storedRestaurantData.getStoredRestaurants()
	restaurantsData.push(restaurant)
	storedRestaurantData.storeRestaurants(restaurantsData)
	res.redirect("/confirm")
})

router.get("/restaurants", function (req, res) {
	let order = req.query.order

	let nextOrder = "desc"
	if (order === "desc") {
		nextOrder = "asc"
	}

	const restaurantsData = storedRestaurantData.getStoredRestaurants()

	restaurantsData.sort(function (restA, restB) {
		if (order === "asc") {
			if (restA > restB) {
				return -1
			} else {
				return 1
			}
		} else if (order === "desc") {
			if (restA > restB) {
				return 1
			} else {
				return -1
			}
		}
	})

	res.render("restaurants", {
		numberOfRestaurants: restaurantsData.length,
		restaurants: restaurantsData,
		nextOrder,
	})
})

router.get("/restaurants/:id", function (req, res) {
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

module.exports = router
