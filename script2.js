//Array de objetos , con los perfumes femeninos
let perfumesFemeninos = [
    { id: 21, nombre: "La Vida Es Bella", esencia: "Floral", cantidad: "60Ml", precio: "14500", categoria: "Femenino", rutaImagen: "la-vida-es-bella.jpg" },
    { id: 22, nombre: "Good Girl", esencia: "Madera", cantidad: "60Ml", precio: "16500", categoria: "Femenino", rutaImagen: "good-girl.jpg" },
    { id: 23, nombre: "My Way", esencia: "Citrico", cantidad: "60Ml", precio: "13000", categoria: "Femenino", rutaImagen: "my-way.jpg" },
    { id: 24, nombre: "Olympea", esencia: "Floral", cantidad: "60Ml", precio: "12500", categoria: "Femenino", rutaImagen: "olympea.jpg" },
    { id: 25, nombre: "Fame", esencia: "Madera", cantidad: "60Ml", precio: "17500", categoria: "Femenino", rutaImagen: "fame.jpg" },
    { id: 26, nombre: "Lady Millon", esencia: "Citrico", cantidad: "60Ml", precio: "18000", categoria: "Femenino", rutaImagen: "lady-millon.jpg" },
    { id: 27, nombre: "Si", esencia: "Floral", cantidad: "60Ml", precio: "19000", categoria: "Femenino", rutaImagen: "si.jpg" },
    { id: 28, nombre: "212 Sexy", esencia: "Floral", cantidad: "60Ml", precio: "14500", categoria: "Femenino", rutaImagen: "212-sexy.jpg" },
    { id: 29, nombre: "Halloween", esencia: "Madera", cantidad: "60Ml", precio: "11500", categoria: "Femenino", rutaImagen: "halloween.jpg" },
    { id: 30, nombre: "Nina", esencia: "Floral", cantidad: "60Ml", precio: "10000", categoria: "Femenino", rutaImagen: "nina.jpg" },
    { id: 31, nombre: "L'interdit", esencia: "Citrico", cantidad: "60Ml", precio: "18500", categoria: "Femenino", rutaImagen: "linterdit.jpg" },
    { id: 32, nombre: "Flower", esencia: "Floral", cantidad: "60Ml", precio: "21500", categoria: "Femenino", rutaImagen: "flower.jpg" },
    { id: 33, nombre: "Black Opium", esencia: "Madera", cantidad: "60Ml", precio: "12500", categoria: "Femenino", rutaImagen: "opium.jpg" },
    { id: 34, nombre: "212 Vip Rose", esencia: "Madera", cantidad: "60Ml", precio: "14500", categoria: "Femenino", rutaImagen: "212-vip-rose.jpg" },
    { id: 35, nombre: "Light Blue", esencia: "Floral", cantidad: "60Ml", precio: "12500", categoria: "Femenino", rutaImagen: "light-blue.jpg" }
]
//inicializacion del carrito y funciones para crear las tarjetas dinamicas
let carrito = obtenerCarrito();
crearTarjetasPerfumesFemeninos(perfumesFemeninos)
renderizarCarrito(carrito)
//funcion para crear las tarjetas
function crearTarjetasPerfumesFemeninos(perfumesFemeninos) {
    let contenedorPerfumes = document.getElementById("perfumes-femeninos");
    contenedorPerfumes.innerHTML = "";
    perfumesFemeninos.forEach(perfume => {
        contenedorPerfumes.innerHTML += `
        <div class="tarjeta__perfume">
            <h3 class="titulo__perfume">${perfume.nombre}</h3>
            <p class="subtitulo__perfume">Precio: $${perfume.precio}</p>
            <p class="subtitulo__perfume">Esencia: ${perfume.esencia}</p>
            <p class="subtitulo__perfume">Cantidad: ${perfume.cantidad}</p>
            <img class="imagen__perfume" src="../assets/Imagenes/perfumes-femeninos/${perfume.rutaImagen}" alt="${perfume.nombre}">
            <button class="boton" id="boton-${perfume.id}">Añadir al carrito</button>
        </div>`;
    });
}
//buscador por nombre
let input = document.getElementById("buscar__femeninos")
let botonBuscar = document.getElementById("boton__femeninos");
botonBuscar.addEventListener("click", () => {
    filtrarPorNombre(perfumesFemeninos, input.value);
});
//funcion para filtrar por nombres 
function filtrarPorNombre(perfumes, busqueda) {
    let perfumesFiltrados = perfumesFemeninos.filter(perfumes => perfumes.nombre.toLowerCase().includes(busqueda))
    console.log(perfumesFiltrados)
    if (busqueda.length === 0) {
        crearTarjetasPerfumesFemeninos(perfumesFemeninos)
    } else {
        crearTarjetasPerfumesFemeninos(perfumesFiltrados)
        console.log(perfumesFiltrados)
    }
}

//Filtros por esencia , utilize el evento change para que filtre por la esencia deseada al clickear en el chekbox
let selector = document.getElementById("div__filtros__femeninos")
selector.addEventListener("change", () => filtrarPorEsencia())
function filtrarPorEsencia() {
    let esencia = []
    let inputs = document.getElementsByClassName("input__fem")
    for (const input of inputs) {
        if (input.checked) {
            esencia.push(input.id)
        }
    }
    if (esencia.length === 0) {
        crearTarjetasPerfumesFemeninos(perfumesFemeninos)
    } else {
        perfumesFiltrados = perfumesFemeninos.filter(producto => esencia.includes(producto.esencia.toLowerCase()))
        crearTarjetasPerfumesFemeninos(perfumesFiltrados)
    }

}
// Funciones para agregar los elemenots al carrito
let botonesAgregarAlCarrito = document.querySelectorAll('.boton');
botonesAgregarAlCarrito.forEach(boton => {
    boton.addEventListener("click", () => {
        let idProducto = boton.id.split('-')[1];
        let producto = perfumesFemeninos.find(p => p.id == idProducto);
        agregarAlCarrito(producto, carrito);
        renderizarCarrito(carrito);
        setearCarrito(carrito);
    });
});
// esta funcion a demas de agregar al carrito , suma unidades y precio
function agregarAlCarrito(producto, carrito) {
    let indiceProdCarrito = carrito.findIndex(item => item.id === producto.id);
    if (indiceProdCarrito != -1) {
        carrito[indiceProdCarrito].unidades++;
        carrito[indiceProdCarrito].subtotal = carrito[indiceProdCarrito].precioUnitario * carrito[indiceProdCarrito].unidades;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precioUnitario: producto.precio,
            unidades: 1,
            subtotal: producto.precio
        });
    }
}

function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("contenedorCarritoFemenino");
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        contenedorCarrito.innerHTML += `
        <div class="div__carrito">
            <p class="subtitulo__perfume">Nombre: ${producto.nombre}</p>
            <p class="subtitulo__perfume">Precio unitario: $${producto.precioUnitario}</p>
            <p class="subtitulo__perfume">Unidades: ${producto.unidades}</p>
            <p class="subtitulo__perfume">Subtotal: $${producto.subtotal}</p>
            <hr>
        </div>
        `;
    });
    sumaTotalDelCarrito(carrito);
}
// Con esta funcion nos damos cuenta del precio total de los productos en el carrito
function sumaTotalDelCarrito(carrito) {
    let total = carrito.reduce((acum, prod) => {
        let subtotal = prod.precioUnitario * prod.unidades;
        return acum + subtotal;
    }, 0);
    let contenedorTotal = document.getElementById("totalFemenino");
    contenedorTotal.innerHTML = "";
    let infoTotal = document.createElement("h3");
    infoTotal.innerHTML = `Total: $${total}`;
    contenedorTotal.appendChild(infoTotal);
}
// Funciones para JSON y storage
function obtenerCarrito() {
    let carrito = [];
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
    }
    return carrito;
}

function setearCarrito(carrito) {
    let carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
}
//Funcion para finalizar la compra vaciando el carrito y los elementos en el storage
function finalizarCompra() {
    localStorage.removeItem("carrito");
    carrito.length = 0;
    renderizarCarrito([]);
    alert("GRACIAS POR SU COMPRA");
}
// Funcion para poder ocultar el carrito mientas estamos seleccionando los productos
let botonVerCarrito = document.getElementById("boton__carrito__femenino");
botonVerCarrito.addEventListener("click", verOcultar);

function verOcultar(e) {
    if (e.target.innerText === "Carrito") {
        e.target.innerText = "Producto";
    } else {
        e.target.innerText = "Carrito";
    }

    let contenedorProductos = document.getElementById("pagina__productos__femeninos");
    let contenedorCarrito = document.getElementById("pagina__carrito__femenino");

    contenedorCarrito.classList.toggle("oculto");
    contenedorProductos.classList.toggle("oculto");
    sumaTotalDelCarrito(carrito);
}

let botonFinalizar = document.getElementById("fin__femeninos");
botonFinalizar.addEventListener("click", finalizarCompra);

