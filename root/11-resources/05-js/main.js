// Capture the input file element
const input = document.getElementById('input-file');
const image = document.getElementById("image");


// Listen for changes in the input file
input.addEventListener('change', function() {
    // For Fun
    const imageUrl = URL.createObjectURL(input.files[0]);
    //image.src = imageUrl;

    // Get the selected file
    const file = this.files[0];

    // Create a FormData object to store the file data
    const formData = new FormData();
    formData.append('image', file);

    // Send a POST request to the server with the file data
    fetch('/upload-image', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upload image');
        }
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error uploading image:', error);
    });
    
    //updateInfoTable();
    location.href = '../01-pages/nutrition.html';

    
});

function updateInfoTable() {
    // Fetch the nutritional data from the JSON file and call the functions to update the UI
    fetch('../../../selected_nutritional_info.json')
    .then(response => response.json())
    .then(data => {
        console.log("Inside json fetch");
        const foodNames = data.map(item => item.foodName);
        formatFoodNameList(foodNames);
        populateNutritionTable(data);
        document.getElementById('food-image').src = imageUrl;
    })
    .catch(error => {
        console.error('Error fetching nutritional info:', error);
    });
}

// Function to format the food name list
function formatFoodNameList(foodNames) {
    const nameListDiv = document.querySelector('.food-name-list');
    nameListDiv.innerHTML = ''; // Clear existing content
    foodNames.forEach(name => {
      const nameDiv = document.createElement('div');
      nameDiv.textContent = name;
      nameListDiv.appendChild(nameDiv);
    });
 }
  
  // Function to populate the nutrition table with data
  function populateNutritionTable(nutritionData) {
    const nutritionTable = document.getElementById('nutrition-table');
    nutritionTable.innerHTML = ''; // Clear previous data
  
    // Calculate and append the total of each nutritional category
    const total = nutritionData.reduce((acc, item) => {
      acc.calories += item.calories;
      acc.total_fat += item.total_fat;
      acc.sodium += item.sodium;
      acc.carbs += item.carbs;
      acc.sugar += item.sugar;
      acc.protein += item.protein;
      return acc;
    }, { calories: 0, total_fat: 0, sodium: 0, carbs: 0, sugar: 0, protein: 0 });
  
    // Helper function to create and append a table row
    const appendRow = (header, value) => {
      const row = nutritionTable.insertRow();
      const headerCell = row.insertCell();
      const valueCell = row.insertCell();
      headerCell.textContent = header;
      valueCell.textContent = value.toFixed(2); // Rounds to 2 decimal places
    };
  
    // Append rows for each nutritional fact
    appendRow('Calories', total.calories);
    appendRow('Total Fat', total.total_fat);
    appendRow('Sodium', total.sodium);
    appendRow('Carbs', total.carbs);
    appendRow('Sugar', total.sugar);
    appendRow('Protein', total.protein);
  }
  

