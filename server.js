const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');
require('dotenv').config();

const app = express();
const port = 3000;

// Serves the HTML and CSS
app.use(express.static('root'));

// Configure multer to handle file uploads
const upload = multer({ dest: 'root/11-resources/02-images/02-temp' });

// POST
// Handle file upload endpoint and deletion of temp files
app.post('/upload-image', upload.single('image'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    console.log('Received image file:', file);

    // Convert the received image to JPG format
    sharp(file.path)
        .toFormat('jpg')
        .toBuffer()
        .then((data) => {
        // Save the converted image to the server's file system
        const filePath = `root/11-resources/02-images/01-upload/meal.jpg`;
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                console.error('Error saving converted image:', err);
                return res.status(500).send('Error saving converted image');
            }
            console.log('Converted image saved:', filePath);

            // Close the file handle
            fs.closeSync(fs.openSync(filePath, 'r'));

            // After saving the converted image, delete the uploaded file
            //deleteUploadedFile(file.path);

            // Call external API
            callExternalAPI(filePath, res);
            //callExternalAPIAndDownload(filePath, res);
        });
    })
    .catch((err) => {
        console.error('Error converting image:', err);
        res.status(500).send('Error converting image');
    });
});

// Function to delete uploaded file
function deleteUploadedFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting uploaded file:', err);
        } else {
            console.log('Uploaded file deleted successfully');
        }
    });
}


// Function to call external API
function callExternalAPI(imagePath, res) {
    const img = imagePath; // Replace with the path to the image
    const apiUserToken = process.env.API_USER_TOKEN;; // Replace with your API user token
    const headers = { 'Authorization': 'Bearer ' + apiUserToken };

    // Single/Several Dishes Detection
    const segmentationUrl = 'https://api.logmeal.com/v2/image/segmentation/complete';
    const segmentationForm = new FormData();
    segmentationForm.append('image', fs.createReadStream(img));

    fetch(segmentationUrl, {
        method: 'POST',
        headers: headers,
        body: segmentationForm
    })
    .then(segmentationResponse => {
        if (!segmentationResponse.ok) {
            throw new Error('Failed to fetch segmentation API response');
        }
        return segmentationResponse.json();
    })
    .then(segmentationData => {
        // Nutritional information
        const nutritionUrl = 'https://api.logmeal.com/v2/recipe/nutritionalInfo';
        return fetch(nutritionUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ imageId: segmentationData.imageId }),
        });
    })
    .then(nutritionResponse => {
        if (!nutritionResponse.ok) {
            throw new Error('Failed to fetch nutritional information API response');
        }
        return nutritionResponse.json();
    })
    .then(nutritionData => {
        console.log(nutritionData); // Display nutritional info
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
