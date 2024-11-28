document.querySelector('button[type="submit"]').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission reload

    // Collect the values from the form fields
    const firstName = document.querySelector('#first_name').value;
    const lastName = document.querySelector('#last_name').value;
    const address = document.querySelector('#address').value;
    const gender = document.querySelector('#gender').value;
    const dob = document.querySelector('#dob').value;
    const telephone = document.querySelector('#telephone').value;
    const age = document.querySelector('#age').value;
    const salary = document.querySelector('#salary').value;
    const password = document.querySelector('#password').value;
    const image = document.querySelector('#image').files[0]; // Get the uploaded file

    // Prepare the data object
    const jsonData = {
        "first_name": firstName,
        "last_name": lastName,
        "address": address,
        "gender": gender,
        "dob": dob,
        "telephone": telephone,
        "age": age,
        "salary": salary,
        "password": password,
        "role": "Seller", // Example, assuming this is static or hardcoded
    };

    // Check if an image is uploaded and convert to Base64 if available
    if (image) {
        jsonData.image = await convertToBase64(image); // Convert the image to Base64
    } else {
        jsonData.image = null; // If no image, set as null
    }

    // Add the authorization token (if needed)
    const token = localStorage.getItem('auth_token'); // Assuming the token is saved in localStorage
    if (!token) {
        alert('You must be logged in to add a user!');
        return;
    }

    try {
        // Define the API URL
        const API_URL = 'http://localhost:3000/api/addNewUser'; // Replace with your API URL

        // Send the data to the backend API using fetch
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add the authorization token
            },
            body: JSON.stringify(jsonData), // Send the JSON data
        });

        // Parse the response
        const result = await response.json();

        // Handle response
        const responseMessage = document.getElementById('responseMessage');
        if (response.ok) {
            responseMessage.textContent = `User added successfully! User ID: ${result.user_id}`;
            responseMessage.className = 'text-green-500';
        } else {
            responseMessage.textContent = result.message;
            responseMessage.className = 'text-red-500';
        }
    } catch (error) {
        console.error('Error adding user:', error);
        alert('An error occurred. Please try again.');
    }
});

// Function to convert an image file to Base64
async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Remove Base64 prefix
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Read the file as Data URL (Base64)
    });
}
