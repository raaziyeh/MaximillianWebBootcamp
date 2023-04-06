const fs = require('fs')
const path = require('path')

const express = require('express')
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
	const restaurantsData = storedRestaurantData.getStoredRestaurants()
	res.render("restaurants", {
		numberOfRestaurants: restaurantsData.length,
		restaurants: restaurantsData,
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