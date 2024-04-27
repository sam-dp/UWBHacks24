const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('root'));

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
