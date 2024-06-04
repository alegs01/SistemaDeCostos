let cart = [];
let total = 0;
let cartCount = 0;
let pesoTotal = 0; // Variable para almacenar el peso total de los productos
let subtotal = 0; // Variable para almacenar el subtotal antes de aplicar descuentos
let discountedTotal = 0;

function addToCart(product, price, peso) {
    cart.push({ product, price, peso });
    cartCount++;
    document.getElementById('cartCount').innerText = cartCount;
    pesoTotal += peso;
    document.getElementById('cartPeso').innerText = pesoTotal;
    subtotal += price; // Añadir el precio al subtotal
    total = subtotal; // Establecer el total como el subtotal inicialmente
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let discountMessage = '';
     // Variable para almacenar el total con descuento

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} - $${item.price}`;
        cartItems.appendChild(li);
    });

    if (cartCount >= 10 && cartCount < 20) {
        discountedTotal = subtotal * 0.9; // Calcular el total con descuento del 10%
        discountMessage = 'Se aplicó un descuento del 10%.';
    } else if (cartCount >= 20 && cartCount < 30) {
        discountedTotal = subtotal * 0.8; // Calcular el total con descuento del 20%
        discountMessage = 'Se aplicó un descuento del 20%.';
    } else if (cartCount >= 30) {
        discountedTotal = subtotal * 0.7; // Calcular el total con descuento del 30%
        discountMessage = 'Se aplicó un descuento del 30%.';
    }

    if (discountedTotal > 0) {
        total = discountedTotal; // Establecer el total como el total con descuento si hay descuento
    } else {
        total = subtotal; // Si no hay descuento, establecer el total como el subtotal
    }

    document.getElementById('total').textContent = total; // Asegurar que el total tenga 2 decimales

    const discountMessageElement = document.getElementById('discount-message');
    discountMessageElement.textContent = discountMessage;
    discountMessageElement.style.display = discountMessage ? 'block' : 'none';
}

function calcularIVA() {
    const iva = Math.round(total * 0.12);
    const totalIVA = total + Math.round(iva);
    document.getElementById('mensajeImpuesto').textContent = `Se ha agregado un 12% de impuesto (IVA): $${iva}`;
    document.getElementById('total').textContent = totalIVA; 
}

function pagar() {
    calcularIVA(); // Calcular el impuesto del IVA antes de pagar
    
    
}

document.getElementById('btnPagar').addEventListener('click', pagar);

//ventana
function openModal() {
    document.getElementById('discountModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('discountModal').style.display = 'none';
}

// Close the modal when the user clicks anywhere outside of the modal content
window.onclick = function(event) {
    const modal = document.getElementById('discountModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}