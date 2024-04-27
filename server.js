

const express = require('express');
const multer = require('multer');
const sharp = require('sharp'); // Import sharp for image conversion
const fs = require('fs');

const app = express();
const port = 3000;

// Serves the HTML and CSS
app.use(express.static('root'));

// Configure multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Handle file upload endpoint
//
// /upload-image
//
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
            const filePath = `./converted_images/meal.jpg`;
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    console.error('Error saving converted image:', err);
                    return res.status(500).send('Error saving converted image');
                }
                console.log('Converted image saved:', filePath);
                res.json({ message: 'Image received and saved successfully' });
            });
        })
        .catch((err) => {
            console.error('Error converting image:', err);
            res.status(500).send('Error converting image');
        });

    // Get Response from API
        // TODO

    // Delete locally stored pictures
        // TODO
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

