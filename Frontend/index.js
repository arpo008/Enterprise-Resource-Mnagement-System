// Select the form element and listen for submit events
document.querySelector('button[type="submit"]').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission reload

    // Define the API URL
    const API_URL = 'http://localhost:3000/api/login'; // Replace with your API URL

    const user_id = document.querySelector('#user_id').value;
    const password = document.querySelector('#password').value;

    // Create the JSON data to send
    const jsonData = {
        "user_id": user_id,
        "password": String(password)
    };

    try {
        console.log(user_id);
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
            
            // Display success message or redirect
            alert(data.web_tokens);
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
