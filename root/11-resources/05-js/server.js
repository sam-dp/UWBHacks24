const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configure Multer
// The diskStorage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')  // Specify the folder to store the images
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))  // Name the file
    }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');  // Test route
});

// POST route for uploading files
app.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.send('File uploaded successfully.');
    } else {
        res.send('Something went wrong with the file upload.');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});