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

// Handle file upload endpoint
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
});

// Endpoint to delete locally stored pictures
app.delete('/delete-uploaded-images', (req, res) => {
    const directory = "uploads/";

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).send('Error reading directory');
        }

        files.forEach((file) => {
            fs.unlink(path.join(directory, file), (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        });

        res.json({ message: 'Uploaded images deleted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
