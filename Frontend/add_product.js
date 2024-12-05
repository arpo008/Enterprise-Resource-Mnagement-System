document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#addProductForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const price = parseFloat(document.querySelector('#price').value);
        const category = document.querySelector('#category').value;
        const quantity = parseInt(document.querySelector('#quantity').value);
        const imageFile = document.querySelector('#image').files[0];

        // Validate inputs
        if (!name || isNaN(price) || !category || isNaN(quantity)) {
            alert('Please fill in all the fields.');
            return;
        }

        if (price < 0 || quantity < 0) {
            alert('Price and quantity must not be negative.');
            return;
        }

        if (imageFile && imageFile.size > 5 * 1024 * 1024) {
            alert('Image size exceeds 5MB.');
            return;
        }

        let imageBase64 = null;

        // Convert the image to Base64
        if (imageFile) {
            try {
                imageBase64 = await compressAndConvertToBase64(imageFile);
            } catch (error) {
                console.error('Error converting image to Base64:', error);
                alert('Failed to process the image. Please try again.');
                return;
            }
        }

        // Prepare JSON data
        const jsonData = {
            name: name,
            price: price,
            category: category,
            quantity: quantity,
            image: imageBase64, // Send Base64 image string
        };
        for (const key in jsonData) {
            const value = jsonData[key];
            
            // Log the type of each value
            console.log(`${key}: ${typeof value}`);
          }
        
        const token = localStorage.getItem('auth_token');
        if (!token) {
            alert('You must be logged in to add a product!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(jsonData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Product added successfully!');
                window.location.href = 'dashboard.html';
            } else {
                alert(`Failed to add product: ${result.message}`);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Function to compress and convert an image to Base64
    async function compressAndConvertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async () => {
                const img = new Image();
                img.src = reader.result;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Set maximum dimensions for resizing
                    const maxWidth = 800;
                    const maxHeight = 800;
                    let width = img.width;
                    let height = img.height;

                    // Scale the image proportionally
                    if (width > maxWidth || height > maxHeight) {
                        if (width > height) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                        } else {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert the image to Base64 with compression
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(compressedBase64.split(',')[1]); // Return Base64 without the prefix
                };

                img.onerror = reject;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file); // Read the image file as a Data URL
        });
    }
});
