// const fs = require('fs'); 
// const https = require('https');

const uploadInput = document.getElementById("input-file");
const image = document.getElementById("image");

// User Uploads Image
// Client-side JS passes the image URL to Server-side (fetch)
uploadInput.onchange = function()
{
    // Capture uploaded image
    console.log("in uploadInput.onchange()");
    imageURL = URL.createObjectURL(uploadInput.files[0]);
    image.src = imageURL;

    console.log(imageURL);
    
    // Pass image to server
    // fetch('/upload')
    // .then(response => response.json())
    // .then(imageURL => {
    //     console.log();
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });

}
