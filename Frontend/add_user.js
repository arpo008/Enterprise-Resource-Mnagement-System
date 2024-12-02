document.querySelector('#addUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const firstName = document.querySelector('#first_name').value.trim();
    const lastName = document.querySelector('#last_name').value.trim();
    const address = document.querySelector('#address').value.trim();
    const gender = document.querySelector('#gender').value === "male" ? "M" : "F";
    const dob = document.querySelector('#dob').value;
    const telephone = document.querySelector('#telephone').value.trim();
    const age = parseInt(document.querySelector('#age').value, 10);
    const salary = parseFloat(document.querySelector('#salary').value);
    const password = document.querySelector('#password').value.trim();
    const role = document.querySelector('#role').value.trim();
    const imageFile = document.querySelector('#image').files[0];

    // Validate inputs
    if (!firstName || !lastName || !address || !dob || !telephone || !age || !salary || !password || !role) {
        alert("Please fill in all required fields.");
        return;
    }

    if (age <= 0 || salary <= 0) {
        alert("Age and salary must be positive values.");
        return;
    }

    // Check image size before sending
    if (imageFile && imageFile.size > 5 * 1024 * 1024) { // Limit to 5MB
        alert("Image size exceeds 5MB. Please upload a smaller file.");
        return;
    }

    // Convert the image file to Base64 (compress if necessary)
    let imageBase64 = null;
    if (imageFile) {
        imageBase64 = await compressAndConvertToBase64(imageFile);
    }

    // Prepare the data object
    const jsonData = {
        first_name: firstName,
        last_name: lastName,
        address: address,
        gender: gender,
        dob: dob,
        telephone: telephone,
        age: age,
        salary: salary,
        password: password,
        role: role,
        image: imageBase64, // Include image if available
    };

    // Authorization token
    const token = localStorage.getItem('auth_token');
    if (!token) {
        alert('You must be logged in to add a user!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/addNewUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(jsonData), // Send the JSON data
        });

        const result = await response.json();

        // Handle server response
        if (response.ok) {
            alert(`User added successfully!`);
            window.location.href = 'Admin.html'; // Redirect to employee list
        } else {
            alert(`Failed to add user: ${result.message}`);
        }
    } catch (error) {
        console.error('Error adding user:', error);
        alert('An error occurred. Please try again.');
    }
});

// Function to compress and convert an image file to Base64
async function compressAndConvertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Resize image to a smaller size (optional compression)
                const maxWidth = 800; // Max width (adjust as needed)
                const maxHeight = 800; // Max height (adjust as needed)
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height = Math.floor((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.floor((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // Convert resized image to Base64
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
                resolve(compressedBase64.split(',')[1]); // Remove Base64 header
            };

            img.onerror = (err) => reject(err);
        };

        reader.onerror = (err) => reject(err);

        reader.readAsDataURL(file); // Read the file
    });
}
