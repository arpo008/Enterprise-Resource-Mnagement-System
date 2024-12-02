// Select the login button and listen for click events
document.querySelector('button[type="submit"]').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Define the API URL
    const API_URL = 'http://localhost:3000/api/login'; // Replace with your API URL

    // Collect input values
    const user_id = document.querySelector('#user_id').value;
    const password = document.querySelector('#password').value;

    // Prepare the JSON payload
    const jsonData = {
        user_id: user_id,
        password: String(password),
    };

    try {
        // Make the API call using fetch
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify JSON in the request
            },
            body: JSON.stringify(jsonData), // Convert object to JSON string
        });

        if (response.ok) {
            const data = await response.json();

            // Store the token in localStorage
            localStorage.setItem('auth_token', data.web_tokens);

            // Display success message and redirect
            alert('Login successful!');
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Login failed: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
