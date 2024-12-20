let cartItems = [];

function addToCart(name, price) {
    cartItems.push({
        name,
        price
    });
    updateCart();
}

function updateCart() {
    const cartItemsList = document.getElementById('cartItems');
    const cartButton = document.getElementById('cartButton');
    cartItemsList.innerHTML = '';
    let cartTotal = 0;

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price} руб.`;
        cartItemsList.appendChild(listItem);
        cartTotal += item.price;
    });

    cartButton.textContent = `Корзина (${cartItems.length})`;
    cartTotal.textContent = cartTotal;
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
}

function clearCart() {
    cartItems = [];
    updateCart();
}

function filterProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}