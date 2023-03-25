let productNameInputElement = document.getElementById("product-name")
let remainedCharsElement = document.getElementById("remaining-chars")

let maxAllowedChars = productNameInputElement.maxLength

function updateRemainingChars(event) {
	let enteredText = event.target.value
	let enteredTextLength = enteredText.length
	let remainingChars = maxAllowedChars - enteredTextLength
	remainedCharsElement.textContent = remainingChars
}

productNameInputElement.addEventListener("input", updateRemainingChars)
