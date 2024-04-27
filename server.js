const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serves the HTML and CSS
app.use(express.static('root'));

// Configure multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

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
            const filePath = `./converted_images/meal.jpg`;
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    console.error('Error saving converted image:', err);
                    return res.status(500).send('Error saving converted image');
                }
                console.log('Converted image saved:', filePath);

                // After saving the converted image, delete the uploaded file
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error('Error deleting uploaded file:', err);
                    }
                });

                res.json({ message: 'Image received and saved successfully' });
            });
        })
        .catch((err) => {
            console.error('Error converting image:', err);
            res.status(500).send('Error converting image');
        });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
