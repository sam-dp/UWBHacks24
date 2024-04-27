const express = require('express');
const app = express();
const port = 3000;

// Serves the HTML and CSS
app.use(express.static('root'));


// Take In image URL from Client-side
app.get('/upload', (req, res) => {

    // https.get(url,(res) => { 
    //     // Image will be stored at this path 
    //     const path = `${__dirname}/img.jpeg`;  
    //     const filePath = fs.createWriteStream(path); 
    //     res.pipe(filePath); 
    //     filePath.on('finish',() => { 
    //         filePath.close(); 
    //         console.log('Download Completed');  
    //     }) 
    // })
    console.log('In server.js');

});


// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
