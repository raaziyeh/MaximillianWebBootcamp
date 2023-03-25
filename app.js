const productNameInputElement = document.getElementById("product-name")
const remainedCharsElement = document.getElementById("remaining-chars")

const maxAllowedChars = productNameInputElement.maxLength

function updateRemainingChars(event) {
	const enteredText = event.target.value
	const enteredTextLength = enteredText.length
	const remainingChars = maxAllowedChars - enteredTextLength
	remainedCharsElement.textContent = remainingChars
}

productNameInputElement.addEventListener("input", updateRemainingChars)
