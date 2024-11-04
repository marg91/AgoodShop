import Carrito from "./carrito.js";

const carrito = new Carrito();
const euro = '€';

document.addEventListener('DOMContentLoaded', function(event) {
    let productos = [];

    function cargarTabla(productos) {
        const tablaProducts = document.getElementById("tablaProducts").getElementsByTagName('tbody')[0];
        tablaProducts.innerHTML = ""; 

        productos.forEach(producto => {
            const fila = document.createElement('tr');


            const SKUcell = document.createElement('td');
            const element = document.createElement('p');
            element.innerText = producto.title;
            const skuElement = document.createElement('p');  
            skuElement.classList.add('sku');
            SKUcell.appendChild(element);
            SKUcell.appendChild(skuElement);
            fila.appendChild(SKUcell);

   
            const cantidad = document.createElement('td');
            const cantidadDiv = document.createElement('div');
            cantidadDiv.style.display = 'flex'; 

            const botonMenos = document.createElement('button');
            botonMenos.textContent = "-";
            const botonMas = document.createElement('button');
            botonMas.textContent = "+";
            const acumulador = document.createElement('input');
            acumulador.type = "number";
            acumulador.value = 0;
            acumulador.min = 0;
            acumulador.style.width = '35px';

            cantidadDiv.append(botonMenos, acumulador, botonMas);
            cantidad.appendChild(cantidadDiv);
            fila.appendChild(cantidad);

         
            const precio = document.createElement('td');
            precio.innerText = producto.price + " " + euro;
            fila.appendChild(precio);

   
            const totalCelda = document.createElement('td');
            totalCelda.innerText = "0" + " " + euro;
            fila.appendChild(totalCelda);

            tablaProducts.appendChild(fila);

      
            function updateTotal() {
                const cantidadActual = parseInt(acumulador.value) || 0;
                carrito.actualizarUnidades(producto.sku, cantidadActual, producto.title, producto.price);
                const productoInfo = carrito.obtenerInformacionProducto(producto.sku);
                const total = productoInfo.quantity * producto.price;
                totalCelda.innerText = total.toFixed(2) + " " + euro;
                updateInfCarrito();
            }

 
            botonMenos.addEventListener('click', function() {
                let cantidadActual = parseInt(acumulador.value) || 0;
                if (cantidadActual > 0) {
                    cantidadActual--;
                    acumulador.value = cantidadActual;
                    updateTotal();
                }
            });

            botonMas.addEventListener('click', function() {
                let cantidadActual = parseInt(acumulador.value) || 0;
                cantidadActual++;
                acumulador.value = cantidadActual;
                updateTotal();
            });

            acumulador.addEventListener('input', function() {
                let cantidadActual = parseInt(acumulador.value);
                if (isNaN(cantidadActual) || cantidadActual < 0) {
                    acumulador.value = 0;
                }
                updateTotal();
            });
        });
    }

    function updateInfCarrito() {
        const infoProducto = document.getElementById("unidadesPorProducto");
        const infoPrecio = document.getElementById("unidadesPorPrecioUnitario");
        const totalFinal = document.getElementById("totalFinal");
    
        infoProducto.innerHTML = "";
        infoPrecio.innerHTML = "";
    
        const carritoInfo = carrito.obtenerCarrito();
        carritoInfo.products.forEach(prod => {
            if (prod.quantity > 0) {
                const prodInfoProducto = document.createElement("p");
                prodInfoProducto.innerText = `${prod.quantity} x ${prod.title}`;
                infoProducto.appendChild(prodInfoProducto);
    
                const prodInfoPrecio = document.createElement("p");
                prodInfoPrecio.innerText = `${prod.quantity} x ${(prod.quantity * prod.price).toFixed(2)} ${euro}`;
                infoPrecio.appendChild(prodInfoPrecio);
            }
        });
    
        totalFinal.innerText = `${carritoInfo.total} ${euro}`;
    }


    fetch("https://jsonblob.com/api/1303013895403593728")
        .then((response) => response.json())
        .then((dproducts) => {
            const productos = dproducts.products;
            cargarTabla(productos);
        });

});