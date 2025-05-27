const products = [
{
id: 1,
name: "Nike Air Force 1 '07",
price: 999,
category: "sneakers",
image: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
description: "Comfortable, durable and timeless—it's number one for a reason."
},
{
id: 2,
name: "Nike Everyday Cushion Crew White",
price: 299,
category: "socks",
image: "https://thefoschini.vtexassets.com/arquivos/ids/179149838-1200-1600?v=638760053361870000&width=1200&height=1600&aspect=true",
description: "Power through your workout with the Nike Everyday Cushioned Socks."
},
{
id: 3,
name: "Barakkat Rouge 540 EDP 100ml",
price: 249,
category: "perfumes",
image: "https://dubaiperfumesa.co.za/cdn/shop/files/s-zoom.jpeg-8_720x@2x.jpg?v=1713783787",
description: "Barakkat Rouge 540 by Fragrance World is a Amber Floral fragrance for women and men."
},
{
id: 4,
name: "New Balance Unisex 9060",
price: 899,
category: "sneakers",
image: "https://nb.scene7.com/is/image/NB/u9060blk_nb_02_i?$pdpflexf2MD2x$&qlt=70&fmt=webp&wid=1026&hei=1026",
description: "The 9060 is a new expression of the refined style and innovation-led design of the classic 99X series."
},
{
id: 5,
name: "Nike Everyday Cushioned (6 Pairs)",
price: 499,
category: "socks",
image: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/35c04671-bbd8-43db-b7ec-455e4ae69b37/U+NK+EVERYDAY+CUSH+CRW+6PR+132.png",
description: "Power through your workout with the Nike Everyday Cushioned Socks."
},

{
id: 6,
name: "Yara Lattafa EAU De Parfum 100ml",
price: 349,
category: "perfumes",
image: "https://dubaiperfumesa.co.za/cdn/shop/files/yara-lattafa-100ml-eau-de-parfum-288616_180x@2x.jpg?v=1713785247",
description: "Yara by Lattafa Perfumes is a Amber Vanilla fragrance for women. Yara was launched in 2020."
}
];

// Step 2: Creating out shopping cart.//
//This wi;; store all items the customer wants to buy.//

let cart = [];

// Step 3: Get references to HTML elements//
// This connects our JS to soecific parts of our webpage//

const cartCountElement = document.getElementById('cart-count');
const productsGrid = document.getElementById('products-grid');
const featuredProducts = document.getElementById('featured-products');

// Step 4: Utility function to format prices//
// Make "R999.00" instead of just "999"//

function formatPrice(price) {
    return 'R' + price.toFixed(2);
}

console.log('JavaScript loaded successfully!');
console.log('We have', products.length, 'products');

// Function to create HTML for one product card//

function createProductCard(product) {
// Template literals (backticks) let us create HTML with JavaScript//
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-small" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                    <button class="btn btn-secondary btn-small" onclick="viewProduct(${product.id})">
                        View Details
                    </button>
                </div>
            </div>
        </div>`
}

// Function to display products on the page//
function displayProducts(productsToShow = products) {
    if (productsGrid) {
        console.log('Display products... on products page');
        productsGrid.innerHTML = productsToShow.map(createProductCard).join('');
    }

    if (featuredProducts){
        const featuredHTML = productsToShow.slice(0, 6).map(createProductCard).join('');
        featuredProducts.innerHTML = featuredHTML; 
    }
}

//Function to add products to cart//
function addToCart(productId) {
    alert(`Product ${productId} added to cart!`);
}

//Function to view product details//
function viewProduct(productId) {
    const product 
        = products.find(prod => prod.id === productId);
    alert('Product: ' + product.name + 
        '\nPrice: ' + formatPrice(product.price) + 
        '\nDescription: ' + product.description);
}

//Function to handle filter button clicks//
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        //Remove active from all buttons//
        button.addEventListener('click', function(){
            filterButtons.forEach(btn => btn.classList.remove('active'));
        //Add active class to the clicked button//
            this.classList.add('active');
        //Get the category from the buttons data-category attribute//
            const category = this.getAttribute('data-category');
        
        //Filter products based on category//
            let filteredProducts;
            if (category === 'all') {
                filteredProducts = products // Show all products//
            } else {
                filteredProducts = products.filter(product => product.category === category);
            }

            displayProducts(filteredProducts);

            console.log('Showing', filteredProducts.length, 'products in category: ', category);
        });
    });
}

//Waiting for the page to load, then display products//
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, displaying products...');
    displayProducts();
    setupFilters();
})

//Function to update item quantity in cart//
function updateQuantity(productId, newQuantity) {
    console.log('Updating quantity for product', productId, 'to', newQuantity);

    //Find the item in our cart//
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuality <= 0) {
            //If quantity is 0 or less, remove the item//
            removeFromCart(productId);
        } else {
            //Update the quantity//
            item.quantity = newQuantity;
            updateCartCount();
            saveCart();
            displayCartItems();
            updateCartSummary();
        }
    }
}

//Function to remove item from cart//
function removeFromCart (productId) {
    console.log('Removing product', productId, 'from cart');

    //Filter out the item we want to remove//
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    displayCartItems();
    showNotification('Item romved from cart');
}

// Function to handle contact form submission//
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();//Stop the form from submitting nnormally//

            //Get form data//
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            //Simple validation//
            let isValid = true;
            const errors = [];

            if (!data.name.trim()) {
                errors.push('Name is required');
                isValid = false;
            }

            if (!validateEmail(data.email)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }

            if (!data.subject) {
                errors.push('Please select a subject');
                isValid = false;
            }

            if (!data.message.trim()) {
                errors.push('Message is required');
                isValid = false;
            } else if (data.message.trim().length < 10) {
                errors.push('Message must be at least 10 charactors long');
                isValid = false;
            }

            if (!isValid) {
                alert('Please fix the following errors:\n' + errors.join('\n'));
                return;
            }

            //Show loading state//
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContect;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            //Simulate sending the message//
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.requestFullscreen(); //Clear form
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

//Update our main page load function
document.addEventListener('DOMContentLoaded', function(){
    console.log('Page loaded...');
    loadCart();
    displayProducts();
    setupFilters();

    //Cart page//
    if (document.getElementById('cart-items')) {
        displayCartItems();
        updateCartSummary();
    }
    
    //Checkout page//
    if (document.getElementById('checkout-form')) {
        if (cart.length === 0) {
            alert('Yor cart is empty!');
            window.location.href = 'products.html';
        }

        displayCheckoutItems();
        updateCheckoutSummary();

        const checkoutForm = document.getElementById('checkout-form');
        checkoutForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(checkoutForm);
            const data = Object.fromEntries(formData);

            let isValid = true;
            const errors = [];

            if (!validateEmail(data.email)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }

            if (!validateCardNumber(data.cardNumber)) {
                errors.push('Please enter a valid 16-digit card number');
                isValid = false;
            }

            if (!isValid) {
                alert('Please fix the following errors:\n' + errors.join('\n'));
                return;
            }

            const submitBtn = checkoutForm.querySelector('button[type"submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            try {
                const result = await processOrder(data);
                if (result.success) {
                    showOrderSuccess(result);
                }
            } catch (error) {
                alert('There was an error proccessing your order. Please try again.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    //Contact page
    handleContactFoem();
});