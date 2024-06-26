let cart = [];
let total = 0;
let cartCount = 0;
let pesoTotal = 0; 
let subtotal = 0;
let discountedTotal = 0;
let totalEnvio = 0;
let subTotalEnvio = 0;
let totalIVA = 0;
let aplicarDscto = 0;

// Añadir al carro
function addToCart(product, price, peso) {
    cart.push({ product, price, peso });
    cartCount++;
    document.getElementById('cartCount').innerText = cartCount;
    pesoTotal += peso;
    document.getElementById('cartPeso').innerText = pesoTotal;
    subtotal += price;
    total = subtotal;
    updateCart();
}

// Actualizar el carro
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let discountMessage = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} - $${item.price}`;
        cartItems.appendChild(li);
    });

    if (cartCount >= 10 && cartCount < 20) {
        discountedTotal = Math.round(subtotal * 0.9);
        discountMessage = 'Se aplicó un descuento por cantidad del 10%.';
    } else if (cartCount >= 20 && cartCount < 30) {
        discountedTotal = Math.round(subtotal * 0.8);
        discountMessage = 'Se aplicó un descuento por cantidad del 20%.';
    } else if (cartCount >= 30) {
        discountedTotal = Math.round(subtotal * 0.7);
        discountMessage = 'Se aplicó un descuento  por cantidad del 30%.';
    }

    if (discountedTotal > 0) {
        total = discountedTotal; 
    } else {
        total = subtotal;
    }

    document.getElementById('total').textContent = total;

    const discountMessageElement = document.getElementById('discount-message');
    discountMessageElement.textContent = discountMessage;
    discountMessageElement.style.display = discountMessage ? 'block' : 'none';
}

//Calcular el IVA
function calcularIVA() {
    const iva = Math.round(total * 0.12);
    totalIVA = total + iva;
    document.getElementById('mensajeImpuesto').textContent = `Se ha agregado un 12% de impuesto (IVA): $${iva}`;
    document.getElementById('total').textContent = totalIVA; 
}

//Botón Pagar
function pagar() {
    if (total === 0) {
        alert('No ha agregado ningún producto al carro');
    } else {
        document.getElementById('btnPagar').disabled = true;
        var botones = document.getElementsByClassName('btnProducto');
    
        for (var i = 0; i < botones.length; i++) {
            botones[i].disabled = true;
        }
        calcularIVA();
        calculoEnvio();
    }
}


document.getElementById('btnPagar').addEventListener('click', pagar);

//Calcular Envío
function calculoEnvio() {
    if (total === 0) {
        alert('Primero agregue un producto al carro');
        return;
    }
    const ciudad = document.getElementById('ciudadEnvio').value;
    let envio = 0;

    switch(ciudad) {
        case 'Santiago':
            envio = 1000;
            break;
        case 'Vina del mar':
            envio = 1500;
            break;
        case 'La Serena':
            envio = 2000;
            break;
        case 'Puerto Montt':
            envio = 3000;
            break;
        case 'Puerto Varas':
            envio = 4000;
            break;      
        default:
            alert("Selecciona una ciudad de envío");
            return;
    }   

    const costoEnvio = pesoTotal * 1000;
    subTotalEnvio = envio + costoEnvio;
    totalTotal = totalIVA + subTotalEnvio;
    document.getElementById('mensajeEnvio').textContent = `El valor del envío es de: $${subTotalEnvio} (Se cobran $1000 por Kg aparte del envío)`;
    document.getElementById('finalTotal').textContent = "Total: $" + totalTotal;
}

//Ventana
function openModal() {
    document.getElementById('discountModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('discountModal').style.display = 'none';
}

// Cerrar ventana
window.onclick = function(event) {
    const modal = document.getElementById('discountModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Descuento
document.getElementById('btnAplicar').addEventListener('click', descuento);

function descuento() {
    
    aplicarDscto = document.getElementById('aplicar').value;
    
    if (aplicarDscto === '123') {
        document.getElementById('btnAplicar').disabled = true;
        total = Math.round(total * 0.9);
        console.log(total);
        document.getElementById('mensajeCodigo').textContent = 'Se ha aplicado un código de descuento del 10%.';
    } else {
        alert('No se ha aplicado ningún descuento');
        console.log(total);
    }

    document.getElementById('total').textContent = total;
}

// Borrar carro
function recargar() {
    location.reload();
}