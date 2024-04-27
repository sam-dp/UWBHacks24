window.onload = function() {
    const uploadInput = document.getElementById("input-file");
    const uploadedImageContainer = document.getElementById("uploaded-image");

    uploadInput.onchange = function() {
        // Remove existing uploaded image if any
        uploadedImageContainer.innerHTML = '';

        // Create new image element
        const image = document.createElement("img");
        image.src = URL.createObjectURL(uploadInput.files[0]);
        image.style.maxWidth = "100%";
        image.style.height = "100%";

        // Append image to the uploaded image container
        uploadedImageContainer.appendChild(image);
    };
};

const uploadInput = document.getElementById("input-file");
const imageContainer = document.getElementById("image-container");

uploadInput.onchange = function() {
  // Capture uploaded image
  const imageURL = URL.createObjectURL(uploadInput.files[0]);
  const image = document.createElement("img");
  image.src = imageURL;

  // Add the image to the container and display it
  imageContainer.innerHTML = ""; // Clear previous content
  imageContainer.appendChild(image);
  imageContainer.style.display = "block"; // Show the container
};


