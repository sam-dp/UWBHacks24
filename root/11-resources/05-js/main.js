$(document).ready(function() {
    $('#uploadButton').click(function() {
        var input = $('#photo')[0];
        if (input.files.length === 0) {
            alert('Please select a file first.');
            return; // Exit the function if no file is selected
        }

        var formData = new FormData();
        formData.append('photo', input.files[0]);

        $.ajax({
            url: 'http://localhost:3000/upload',  // Ensure this matches your server configuration
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log('Upload successful!');
                alert('File uploaded successfully.');
            },
            error: function(xhr, status, error) {
                console.error('Upload failed: ' + error);
                alert('Upload failed!');
            }
        });
    });
});