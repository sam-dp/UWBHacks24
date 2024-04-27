const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ message: 'Image uploaded successfully' });
});

// Handle image saving
app.get('/save', (req, res) => {
    const imagePath = path.join(__dirname, 'uploads/', req.file.filename);
    const destination = path.join(__dirname, 'saved_images/', req.file.filename);
    
    fs.copyFile(imagePath, destination, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error saving image' });
        } else {
            res.json({ message: 'Image saved successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});