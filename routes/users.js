const express = require("express")
const multer = require("multer")

const db = require("../data/database")

const router = express.Router()

const storageConfig = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "images")
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname)
	}
})
const upload = multer({storage: storageConfig})

router.get("/", function (req, res) {
	res.render("profiles")
})

router.get("/new-user", function (req, res) {
	res.render("new-user")
})

router.post("/profiles", upload.single("image") ,async function(req, res) {
	const uploadedImageFile = req.file
	const bodyData = req.body

	await db.getDb().collection('users').insertOne({
		username: req.body.username,
		imagePath: req.file.path
	})

	res.redirect("/")
})

module.exports = router
