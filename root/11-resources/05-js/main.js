const fs = require('fs'); 
const https = require('https');

const uploadInput = document.getElementById("input-file");

// User Uploads Image
uploadInput.onchange = function()
{
    imageURL = URL.createObjectURL(uploadInput.files[0]);

    https.get(url,(res) => { 
        // Image will be stored at this path 
        const path = `${__dirname}/img.jpeg`;  
        const filePath = fs.createWriteStream(path); 
        res.pipe(filePath); 
        filePath.on('finish',() => { 
            filePath.close(); 
            console.log('Download Completed');  
        }) 
    })
}
