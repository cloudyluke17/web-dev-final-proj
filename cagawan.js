let grandTotal = 0;

function calculateTotal() {
    let food = document.getElementById("food");

    let foodName = food.options[food.selectedIndex].text;

    let foodPrice = parseInt(food.value);

    let quantity = parseInt(document.getElementById("quantity").value);

    if (quantity <= 0 || isNaN(quantity)) {
        alert("Please enter a valid quantity.");
        return;
    }

    let total = foodPrice * quantity;

    grandTotal += total;

    let orderList = document.getElementById("orderList");

    if (orderList.innerHTML.includes("No orders yet")) {
        orderList.innerHTML = "";
    }

    let orderItem = document.createElement("div");

    orderItem.classList.add("order-item");

    orderItem.innerHTML = `
        <div>
            <strong>${foodName}</strong>
            <br>
            Quantity: ${quantity}
        </div>
        <div>
            ₱${total}
        </div>
        <hr>
    `;

    orderList.appendChild(orderItem);

    document.getElementById("result").innerHTML = "Total: ₱" + grandTotal;

    document.getElementById("quantity").value = 1;
}

function clearOrders() {
    document.getElementById("orderList").innerHTML = "<p>No orders yet.</p>";

    grandTotal = 0;

    document.getElementById("result").innerHTML = "Total: ₱0";
}

function placeOrder() {
    const email = document.getElementById("customerEmail").value;
    const resultDisplay = document.getElementById("result").innerText;
    
    if (grandTotal === 0) {
        alert("Please add items to your order first!");
        return;
    }
    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    let orderSummary = "";
    const items = document.querySelectorAll(".order-item");
    items.forEach(item => {
        orderSummary += item.innerText.replace(/\n/g, " ") + " | ";
    });

    const templateParams = {
        to_email: email,
        from_name: "Cagawan Carinderia",
        order_details: orderSummary,
        total_price: resultDisplay
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
           alert('Order Placed Successfully! Check your email.');
           clearOrders();
           document.getElementById("customerEmail").value = "";
        }, function(error) {
           alert('Failed to send order. Please try again.');
           console.log('FAILED...', error);
        });
}

function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        document.getElementById("formMessage").innerHTML = "Please fill out all fields.";
        return false;
    }

    document.getElementById("formMessage").innerHTML = "Form submitted successfully!";
    return false;
}
