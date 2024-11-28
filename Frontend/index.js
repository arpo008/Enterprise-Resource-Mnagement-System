// Select the form element and listen for submit events
document.querySelector('button[type="submit"]').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission reload

    // Define the API URL
    const API_URL = 'http://localhost:3000/api/login'; // Replace with your API URL

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Create the JSON data to send
    const jsonData = {
        "user_id": email,
        "password": password
    };

    try {
        console.log(email);
        // Make the API call using fetch
        const response = await fetch(API_URL, {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify JSON in the request
            },
            body: JSON.stringify(jsonData) // Convert JavaScript object to JSON string
        });

        // Handle the response
        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);

            // Display success message or redirect
            alert('Login successful!');
            // Redirect to dashboard.html
            window.location.href = 'dashboard.html';
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);

            // Display error message
            alert('Login failed: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
