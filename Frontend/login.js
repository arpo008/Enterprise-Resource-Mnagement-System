document.querySelector('button[type="submit"]').addEventListener('click', async (event) => {
    event.preventDefault();

    const API_URL = 'http://localhost:3000/api/login';
    const user_id = document.querySelector('#user_id').value;
    const password = document.querySelector('#password').value;

    if (!user_id || !password) {
        alert('Please enter both User ID and Password.');
        return;
    }

    console.log('Request Payload:', { user_id, password });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login Response:', data);
            alert('Login successful!');
            localStorage.setItem('auth_token', data.web_tokens);
            window.location.href = 'dashboard.html';
        } else {
            const errorData = await response.json();
            console.error('Login Failed:', errorData);
            alert('Login failed: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        alert('An error occurred. Please try again.');
    }
});
