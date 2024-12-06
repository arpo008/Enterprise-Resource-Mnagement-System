document.querySelector('#updateForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Capture the form data
    const id = document.querySelector('#id').value;
    const category = document.querySelector('#category').value;
    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    const quantity = document.querySelector('#quantity').value;

    // Validate if all fields are filled
    if (!id || !category || !name || !price || !quantity) {
        alert('Please fill in all the required fields.');
        return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append('id', id);          // Append ID
    formData.append('category', category);  // Append category
    formData.append('name', name);     // Append name
    formData.append('price', price);   // Append price
    formData.append('quantity', quantity); // Append quantity

    const API_URL = 'http://localhost:3000/api/updateProduct';
    const authToken = localStorage.getItem('auth_token');  // Retrieve auth token from localStorage

    // Log the token for debugging
    console.log('Authorization Token:', authToken);

    if (!authToken) {
        alert('Authorization token is missing. Please login first.');
        return;
    }

    try {
        // Send the PUT request with FormData and Authorization token
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,  // Attach token to the request
            },
            body: formData,
        });

        // Check if the response is okay
        const data = await response.json();
        console.log('API Response:', data);

        if (response.ok) {
            alert(`Product with ID ${data.product_id} has been updated.`);
        } else {
            // Show backend error message
            alert('Error: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        // Handle fetch errors
        console.error('Error during fetch request:', error);
        alert('An error occurred. Please check the console for more details.');
    }
});
