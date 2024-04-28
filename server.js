const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { spawn } = require('child_process');
const FormData = require('form-data');
require('dotenv').config();

const app = express();
const port = 3000;

// Serves the HTML and CSS
app.use(express.static('root'));

// Configure multer to handle file uploads
const upload = multer({ dest: 'root/11-resources/02-images/02-temp' });

// Child process function to call Python API
function callPythonAPI(imagePath, callback) {
    const pythonProcess = spawn('python', ['./logmeal.py', imagePath]);

    let outputData = '';
    pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        callback(outputData);
    });
}

// POST: Handle file upload endpoint and deletion of temp files
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

                // Call external API using Python
                // callPythonAPI(filePath, (apiResponse) => {
                //     res.send(apiResponse);
                // });

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

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
