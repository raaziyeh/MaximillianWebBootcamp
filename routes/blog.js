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
        humanReadableDate : post.date.toLocaleDateString('en-US', {
            weekDay: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    console.log(postData)

	res.render("post-detail", { postData })
})

router.get("/new-post", async function (req, res) {
	const [authors] = await db.query("SELECT * FROM blog.authors")
	res.render("create-post", { authors })
})

module.exports = router
