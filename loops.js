// Calculator logic
const numberInputElement = document.getElementById("user-number")
const calculateButtonElement = document.querySelector("#calculator button")
const showSumParagraphElement = document.getElementById("calculated-sum")

function calculateSum() {
	const number = +numberInputElement.value
	let sum = 0
	for (let i = 1; i < number + 1; i++) {
		sum += i
	}
	showSumParagraphElement.innerText = sum
	showSumParagraphElement.style.display = "block"
}

calculateButtonElement.addEventListener("click", calculateSum)

// Highlight links logic
const highlightLinksButtonElement = document.querySelector(
	"#highlight-links button"
)

function highlightLinks() {
	const allLinksElements = document.querySelectorAll("#highlight-links a")
	for (const link of allLinksElements) {
		link.classList.add("highlight")
	}
}

highlightLinksButtonElement.addEventListener("click", highlightLinks)

// Display user Data logic
const showUserDataButtonElement = document.querySelector("#user-data button")
const outputUserDataElement = document.getElementById("output-user-data")
const user = {
	name: "Raziyeh",
	age: 30,
	isAdmin: true,
	position: "FullStack Web Developer",
}

function showUserData() {
	outputUserDataElement.innerHTML = ""
	for (const data in user) {
		outputUserDataElement.innerHTML += `<li>${data.toUpperCase()}: ${
			user[data]
		}</li>`
	}
}

showUserDataButtonElement.addEventListener("click", showUserData)

// Statistics Logic
const statisticsButtonElement = document.querySelector("#statistics button")
const userTargetInputElement = document.getElementById("user-target-number")
const outputTotalRollsElement = document.getElementById("output-total-rolls")
const outputTargetNumberElement = document.getElementById(
	"output-target-number"
)
const diceRollsElement = document.getElementById("dice-rolls")

function rollTillTarget() {
	const target = +userTargetInputElement.value
	let result = Math.ceil(Math.random() * 6)
	let rolls = 1
	diceRollsElement.innerHTML = `<li>${result}</li>`

	while (result != target) {
		result = Math.ceil(Math.random() * 6)
		rolls++
		diceRollsElement.innerHTML += `<li>${result}</li>`
	}

	outputTargetNumberElement.innerText = target
	outputTotalRollsElement.innerText = rolls
}

statisticsButtonElement.addEventListener("click", rollTillTarget)
