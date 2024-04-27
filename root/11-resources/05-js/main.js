// Capture the input file element
const input = document.getElementById('input-file');
const image = document.getElementById("image");


// Listen for changes in the input file
input.addEventListener('change', function() {
    // For Fun
    imageUrl = URL.createObjectURL(input.files[0]);
    image.src = imageUrl;

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

    // Send a DELETE request to the server
    fetch('/delete-uploaded-images', {
        method: 'DELETE',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete uploaded images');
        }
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error deleting uploaded images:', error);
    });
});
