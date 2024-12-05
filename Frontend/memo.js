const purchaseDetails = JSON.parse(localStorage.getItem("purchaseDetails"));

const displayMemo = () => {
    const purchaseDetailsContainer = document.getElementById("purchase-details");
    const sellerInfoContainer = document.getElementById("seller-info");

    if (!purchaseDetails) {
        alert("No purchase details found.");
        window.location.href = "index.html"; // Redirect if no purchase details are found
        return;
    }

    const { products, totalPrice, sellerInfo, date } = purchaseDetails;

    // Display purchase details
    let productsListHTML = '<div class="grid grid-cols-2 font-semibold text-lg mb-4">';
    productsListHTML += `<span>Product Name</span><span class="text-right">Price</span></div>`;

    products.forEach(product => {
        const itemTotal = product.quantity * product.price;
        productsListHTML += `
            <div class="grid grid-cols-2 text-gray-600">
                <span>${product.name} (${product.quantity} x $${product.price})</span>
                <span class="text-right">$${itemTotal.toFixed(2)}</span>
            </div>`;
    });

    productsListHTML += `
        <div class="mt-4 font-semibold text-lg">
            <span>Total: $${totalPrice.toFixed(2)}</span>
        </div>`;

    purchaseDetailsContainer.innerHTML = productsListHTML;

    // Display seller info and date/time
    sellerInfoContainer.innerHTML = `
        <p><strong>Seller Info:</strong> ${sellerInfo.name}</p>
        <p><strong>Seller Email:</strong> ${sellerInfo.email}</p>
        <p><strong>Purchase Date and Time:</strong> ${date}</p>
    `;
};

// Handle memo download as PDF
const downloadMemo = () => {
    const { jsPDF } = window.jspdf;  // Extract jsPDF from the global window object

    const doc = new jsPDF();
    
    const purchaseDetailsContainer = document.getElementById("purchase-details");
    const sellerInfoContainer = document.getElementById("seller-info");

    doc.setFontSize(18);
    doc.text("Purchase Memo", 105, 10, { align: "center" });

    doc.setFontSize(12);

    // Add products to PDF
    const productDetails = purchaseDetailsContainer.innerText;
    doc.text(productDetails, 10, 20);

    // Add seller info and date/time to PDF
    const sellerDetails = sellerInfoContainer.innerText;
    doc.text(sellerDetails, 10, 100);

    doc.save("purchase-memo.pdf");
};

// Initialize
displayMemo();
