window.onload = function() {
    setTimeout(function() {
        document.getElementById("fadein").remove();
    }, 1000);
};

const uploadInput = document.getElementById("input-file");
const image = document.getElementById("image");

uploadInput.onchange = function() {
    const imageURL = URL.createObjectURL(uploadInput.files[0]);
    image.src = imageURL;

    // Append the image below the box
    const box = document.getElementById("box");
    const uploadedImage = document.createElement("img");
    uploadedImage.src = imageURL;
    box.appendChild(uploadedImage);
};

