const API_URL = 'http://localhost:3000/api/deleteUser ';

// Function to fetch and display users
async function fetchUsers() {
    const response = await fetch('http://localhost:3000/api/getUsers'); // Assuming you have an endpoint to get users
    const users = await response.json();
    const userTable = document.getElementById('userTable');

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border-b">${user.user_id}</td>
            <td class="py-2 px-4 border-b">${user.first_name}</td>
            <td class="py-2 px-4 border-b">${user.last_name}</td>
            <td class="py-2 px-4 border-b">${user.address || 'N/A'}</td>
            <td class="py-2 px-4 border-b">${user.gender || 'N/A'}</td>
            <td class="py-2 px-4 border-b">${user.dob || 'N/A'}</td>
            <td class="py-2 px-4 border-b">${user.telephone || 'N/A'}</td>
            <td class="py-2 px-4 border-b">${user.age || 'N/A'}</td>
            <td class="py-2 px-4 border-b">${user.salary ? `$${user.salary.toFixed(2)}` : 'N/A'}</td>
            <td class="py-2 px-4 border-b">
                <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="deleteUser (${user.user_id})">Delete</button>
            </td>
        `;
        userTable.appendChild(row);
    });
}

// Function to delete a user
async function deleteUser (user_id) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'DELETE', // Assuming DELETE method for deletion
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id }),
        });

        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            // Refresh the user list after deletion
            document.getElementById('userTable').innerHTML = '';
            fetchUsers();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the user. Please try again.');
    }
}

//