const express = require("express")

const db = require("../data/database")

const router = express.Router()

router.get("/", function (req, res) {
	res.redirect("/posts")
})

router.get("/posts", async function (req, res) {
	const query = `
        SELECT blog.posts.*, blog.authors.name AS author_name FROM blog.posts
        INNER JOIN blog.authors ON posts.author_id = authors.id
        `
	const [posts] = await db.query(query)

	if (!posts || posts.length === 0) {
		return res.status(400).render("404")
	}

	res.render("posts-list", { posts })
})

router.post("/posts", async function (req, res) {
	const data = [
		req.body.title,
		req.body.summary,
		req.body.author,
		req.body.content,
	]
	await db.query(
		"INSERT INTO blog.posts (title, summary, author_id, body) VALUES (?)",
		[data]
	)
	res.redirect("/posts")
})

router.get("/posts/:id", async function (req, res) {
	const postId = +req.params.id
	const query = `
        SELECT blog.posts.*, blog.authors.name AS author_name, blog.authors.email AS author_email FROM blog.posts
        INNER JOIN blog.authors ON posts.author_id = authors.id
        WHERE blog.posts.id = ${postId}
        `
	const [[post]] = await db.query(query)

	if (!post) {
		res.status(404).render("404")
	}

	const postData = {
		...post,
		humanReadableDate: post.date.toLocaleDateString("en-US", {
			weekDay: "long",
			month: "long",
			day: "numeric",
			year: "numeric",
		}),
	}

	console.log(postData)

	res.render("post-detail", { postData })
})

router.get("/posts/:id/edit", async function (req, res) {
	const postId = req.params.id
	const query = `SELECT * FROM blog.posts WHERE posts.id = ${postId}`
	const [post] = await db.query(query)
	if (!post || post.length === 0) {
		res.status(404).render("404")
	}
	res.render("update-post", { post: post[0] })
})

router.post("/posts/:id/edit", async function (req, res) {
	const query = `
        UPDATE blog.posts SET title = ?, body = ?, summary = ?
        WHERE id = ?
        `
        console.log(query)
	await db.query(query, [req.body.title, req.body.content, req.body.summary, req.params.id])

	res.redirect("/posts")
})

router.post("/posts/:id/delete", async function(req, res) {
    await db.query("DELETE FROM blog.posts WHERE id = ?", req.params.id)
    res.redirect("/posts")
})

router.get("/new-post", async function (req, res) {
	const [authors] = await db.query("SELECT * FROM blog.authors")
	res.render("create-post", { authors })
})

module.exports = router
