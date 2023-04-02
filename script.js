const formElement = document.querySelector("form")

function formSubmitHandler(event) {
	event.preventDefault()
	const formData = new FormData(formElement)
	const enteredPlayerName = formData.get("playername")
	console.log(enteredPlayerName)
}

formElement.addEventListener("submit", formSubmitHandler)
