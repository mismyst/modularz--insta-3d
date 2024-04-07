const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cart = document.querySelector('.cart');
const cartItems = document.querySelector('.cart-items');

let cartItemsArray = [];

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const product = productsArray.find(product => product.id === parseInt(productId));

        if (product) {
            const existingItem = cartItemsArray.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItemsArray.push({ ...product, quantity: 1 });
            }

            updateCart();
        }
    });
});

function updateCart() {
    cartItems.innerHTML = '';

    cartItemsArray.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: ${item.price}</p>
        `;
        cartItems.appendChild(cartItem);
    });
}

const productsArray = [
    {
        id: 1,
        name: 'Metal Triangle Ruler',
        price: 29,
        image: 'data:image/jpeg;base64,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'
    }

    const downloadStlButtons = document.querySelectorAll('.download-stl');

    const downloadLinks = document.querySelectorAll('.download-stl');



    // Add more products as needed
];