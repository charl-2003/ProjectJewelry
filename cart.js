// Select the necessary DOM elements
const cartContainer = document.getElementById('cartContainer');
const totalPriceElement = document.getElementById('totalPrice');
const checkoutButton = document.getElementById('checkoutButton');

// Fetch cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items
function displayCart() {
  cartContainer.innerHTML = ''; // Clear the cart container

  if (cart.length === 0) {
    // Display a message if the cart is empty
    cartContainer.innerHTML = '<h2>Your Cart is Empty</h2>';
    totalPriceElement.textContent = '0.00';
    return;
  }

  let total = 0;

  // Loop through cart items and render them
  cart.forEach((product, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-container';

    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <p>Size: ${product.size}</p>
        <p>Type: ${product.type}</p>
        <p>Price: ${product.price}</p>
        <button class="remove-button" data-index="${index}">Remove</button>
      </div>
    `;

    cartContainer.appendChild(cartItem);

    // Calculate total price
    total += parseFloat(product.price.replace('$', ''));

    // Add functionality to remove items
    cartItem.querySelector('.remove-button').addEventListener('click', () => {
      removeFromCart(index);
    });
  });

  // Update total price
  totalPriceElement.textContent = total.toFixed(2);
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
  displayCart(); // Refresh the cart display
}

// Add functionality to the checkout button
checkoutButton.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  alert('Thank you for your purchase! This is a placeholder for checkout.');
  localStorage.removeItem('cart'); // Clear the cart
  cart = [];
  displayCart();
});

// Initialize the cart display on page load
displayCart();
