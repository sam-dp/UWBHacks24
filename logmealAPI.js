require('dotenv').config(); // At the top of your file
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

const imgPath = './Easyspaghetti.jpg';
const apiUserToken = process.env.API_USER_TOKEN; // Loaded from .env file
const headers = { 'Authorization': `Bearer ${apiUserToken}` };

// Single/Several Dishes Detection
const urlSegmentation = 'https://api.logmeal.com/v2/image/segmentation/complete';

const form = new FormData(); // Only if you're using Node.js
form.append('image', fs.createReadStream(imgPath)); // Only if you're using Node.js

fetch(urlSegmentation, {
  method: 'POST',
  headers: headers,
  body: form // In the browser, you would use FormData directly without fs
})
.then(response => response.json())
.then(data => {
  // Nutritional information
  const urlNutrition = 'https://api.logmeal.com/v2/recipe/nutritionalInfo';
  const imageId = data.imageId; // Replace this with the correct property if different

  return fetch(urlNutrition, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'imageId': imageId })
  });
})
.then(response => response.json())
.then(nutritionData => {
  console.log(nutritionData); // Display nutritional info
})
.catch(error => {
  console.error('Error:', error);
});