let inputElement = document.querySelector("input")

function checkInputEvent() {
	console.log("input event")
}

function checkChangeEvent() {
	console.log("change event")
}

inputElement.addEventListener("input", checkInputEvent)
inputElement.addEventListener("change", checkChangeEvent)
