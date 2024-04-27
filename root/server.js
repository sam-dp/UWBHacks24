const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());

// Configure Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '11-resources/02-images/temp');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);  // Use the original filename
    }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.send('Hello world.');  // Test route
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