const previewImageElement = document.getElementById("preview-img")
const imgInputElement = document.getElementById("image")

function showPreview() {
    const pickedFiles = imgInputElement.files
  
    if (!pickedFiles || pickedFiles.length === 0) {
        previewImageElement.style.display = "none"
        return;
    }    
    
    const pickedImage = pickedFiles[0]
    previewImageElement.src = URL.createObjectURL(pickedImage)
    previewImageElement.style.display = "block"
}

imgInputElement.addEventListener('change', showPreview)