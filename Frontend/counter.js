const showSpinner = () => {
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden");
};

const hideSpinner = () => {
    const spinner = document.getElementById("spinner");
    spinner.classList.add("hidden");
};

let allProducts = []; // Store all products globally for filtering

const fetchProducts = async () => {
    showSpinner();

    const authToken = localStorage.getItem("auth_token");

    if (!authToken) {
        alert("You are not logged in. Please login to access this page.");
        window.location.href = "login.html"; // Redirect to login page
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/getAllProduct", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`, // Include token in headers
            },
        });

        if (res.ok) {
            const data = await res.json();
            allProducts = data.Products; // Save all products globally
            displayProducts(allProducts);
        } else {
            const errorData = await res.json();
            alert("Failed to fetch products: " + errorData.message);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        alert("An error occurred while fetching products. Please try again.");
    } finally {
        hideSpinner();
    }
};

const displayProducts = (products) => {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Clear any existing content

    if (products.length === 0) {
        productContainer.innerHTML = `
            <div class="text-center col-span-full">
                <h2 class="text-2xl font-semibold text-gray-700">No Products Available</h2>
                <p class="text-gray-600">Please check back later.</p>
            </div>
        `;
        return;
    }

    products.forEach((product) => {
        const div = document.createElement("div");
        div.className = "card bg-white shadow-md rounded-lg overflow-hidden";

        // Decode the image from base64
        const imageBase64 = `data:image/png;base64,${btoa(
            String.fromCharCode(...product.image.data)
        )}`;

        div.innerHTML = `
            <figure class="w-full">
                <img src="${imageBase64}" alt="${product.name}" class="w-full h-48 object-cover">
            </figure>
            <div class="p-4">
                <h2 class="text-xl font-bold mb-2">${product.name}</h2>
                <p class="text-gray-600">Category: ${product.category}</p>
                <p class="text-gray-600">Price: $${product.price}</p>
                <p class="text-gray-600">Stock Quantity: ${product.stock_quantity}</p>
                <div class="flex justify-between mt-4">
                    <button class="btn btn-primary" onclick="showProductDetails('${product.product_id}')">Details</button>
                </div>
            </div>
        `;

        productContainer.appendChild(div);
    });
};

const filterProductsByCategory = (category) => {
    if (category === "All") {
        displayProducts(allProducts); // Show all products
    } else {
        const filteredProducts = allProducts.filter(
            (product) => product.category === category
        );
        displayProducts(filteredProducts); // Show filtered products
    }
};

const showProductDetails = (productId) => {
    alert(`Show details for product ID: ${productId}`);
};

// Load products on page load
fetchProducts();
