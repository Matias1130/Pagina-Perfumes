//Array de objetos , con los perfumes masculinos
let perfumesMasculinos = [
    { id: 1, nombre: "One Millon", esencia: "Floral", cantidad: "60 Ml", precio: "10000", categoria: "Masculino", rutaImagen: "one-millon.jpg" },
    { id: 2, nombre: "Invictus", esencia: "Floral", cantidad: "60Ml", precio: "12500", categoria: "Masculino", rutaImagen: "invictus.jpg" },
    { id: 3, nombre: "Scandal", esencia: "Citrico", cantidad: "60Ml", precio: "12500", categoria: "Masculino", rutaImagen: "scandal-masculino.jpg" },
    { id: 4, nombre: "Bad Boy", esencia: "Citrico", cantidad: "60Ml", precio: "13500", categoria: "Masculino", rutaImagen: "bad-boy.jpg" },
    { id: 5, nombre: "Ck One", esencia: "Floral", cantidad: "60Ml", precio: "11500", categoria: "Masculino", rutaImagen: "ck-one.jpg" },
    { id: 6, nombre: "212 Vip Black", esencia: "Citrico", cantidad: "60Ml", precio: "10500", categoria: "Masculino", rutaImagen: "212-vip-black.jpg" },
    { id: 7, nombre: "Phantom", esencia: "Citrico", cantidad: "60Ml", precio: "13500", categoria: "Masculino", rutaImagen: "phantom.jpg" },
    { id: 8, nombre: "Kenzo Homme", esencia: "Madera", cantidad: "60Ml", precio: "12500", categoria: "Masculino", rutaImagen: "kenzo-homme.jpg" },
    { id: 9, nombre: "212 Men NYC", esencia: "Floral", cantidad: "60Ml", precio: "15500", categoria: "Masculino", rutaImagen: "212-men-nyc.jpg" },
    { id: 10, nombre: "CH Men", esencia: "Madera", cantidad: "60Ml", precio: "12500", categoria: "Masculino", rutaImagen: "ch-men.jpg" },
    { id: 11, nombre: "212 Vip Men", esencia: "Floral", cantidad: "60Ml", precio: "14000", categoria: "Masculino", rutaImagen: "212-vip-men.jpg" },
    { id: 12, nombre: "Fahrenheit", esencia: "Madera", cantidad: "60Ml", precio: "18500", categoria: "Masculino", rutaImagen: "fahrenheit.jpg" },
    { id: 13, nombre: "Sauvage", esencia: "Madera", cantidad: "60Ml", precio: "11000", categoria: "Masculino", rutaImagen: "sauvage.jpg" },
    { id: 14, nombre: "L'eau D'issey", esencia: "Floral", cantidad: "60Ml", precio: "8500", categoria: "Masculino", rutaImagen: "dissey.jpg" },
    { id: 15, nombre: "Acqua Di Gio", esencia: "Citrico", cantidad: "60Ml", precio: "13000", categoria: "Masculino", rutaImagen: "acqua-di-gio.jpg" },
    { id: 16, nombre: "Armani Code", esencia: "Citrico", cantidad: "60Ml", precio: "17500", categoria: "Masculino", rutaImagen: "armani-code.jpg" },
    { id: 17, nombre: "Polo Blue", esencia: "Madera", cantidad: "60Ml", precio: "12000", categoria: "Masculino", rutaImagen: "polo-blue.jpg" },
    { id: 18, nombre: "Black XS", esencia: "Madera", cantidad: "60Ml", precio: "15500", categoria: "Masculino", rutaImagen: "black-xs.jpg" },
    { id: 19, nombre: "Polo Red", esencia: "Citrico", cantidad: "60Ml", precio: "12500", categoria: "Masculino", rutaImagen: "polo-red.jpg" },
    { id: 20, nombre: "Hugo Man", esencia: "Madera", cantidad: "60Ml", precio: "12000", categoria: "Masculino", rutaImagen: "hugo-men.jpg" },
]
//inicializacion del carrito y funciones para crear las tarjetas dinamicas
let carrito = obtenerCarrito();
crearTarjetasPerfumesMasculinos(perfumesMasculinos, carrito);
renderizarCarrito(carrito);
//funcion para crear las tarjetas
function crearTarjetasPerfumesMasculinos(perfumes, carrito) {
    let contenedorPerfumes = document.getElementById("perfumes-masculinos");
    contenedorPerfumes.innerHTML = "";
    perfumes.forEach(perfume => {
        contenedorPerfumes.innerHTML += `
        <div class="tarjeta__perfume">
            <h3 class="titulo__perfume">${perfume.nombre}</h3>
            <p class="subtitulo__perfume">Precio: $${perfume.precio}</p>
            <p class="subtitulo__perfume">Esencia: ${perfume.esencia}</p>
            <p class="subtitulo__perfume">Cantidad: ${perfume.cantidad}</p>
            <img class="imagen__perfume" src="../assets/Imagenes/perfumes-masculinos/${perfume.rutaImagen}" alt="${perfume.nombre}">
            <button id="boton-${perfume.id}" class="boton">Añadir al carrito</button>
        </div>`;
    });

//buscador por nombre
let input = document.getElementById("buscar")
let botonBuscar = document.getElementById("boton");
botonBuscar.addEventListener("click", () => {
    filtrarPorNombre(perfumesMasculinos, input.value);
});
//funcion para filtrar por nombres
function filtrarPorNombre(perfumes, busqueda) {
    let perfumesFiltrados = perfumesMasculinos.filter(perfumes => perfumes.nombre.toLowerCase().includes(busqueda))
    if (busqueda.length === 0) {
        crearTarjetasPerfumesMasculinos(perfumesMasculinos)
    } else {
        crearTarjetasPerfumesMasculinos(perfumesFiltrados)
    }
}
//Filtros por esencia , utilize el evento change para que filtre por la esencia deseada al clickear en el chekbox
let selector = document.getElementById("div__filtros")
selector.addEventListener("change", () => filtrarPorEsencia())
function filtrarPorEsencia() {
    let esencia = []
    let inputs = document.getElementsByClassName("input")
    for (const input of inputs) {
        if (input.checked) {
            esencia.push(input.id)
        }
    }
    if (esencia.length === 0) {
        crearTarjetasPerfumesMasculinos(perfumesMasculinos)
    } else {
        perfumesFiltrados = perfumesMasculinos.filter(producto => esencia.includes(producto.esencia.toLowerCase()))
        crearTarjetasPerfumesMasculinos(perfumesFiltrados)
    }

}
// Funciones para agregar los elemenots al carrito
let botonesAgregarAlCarrito = document.querySelectorAll('.boton');
botonesAgregarAlCarrito.forEach(boton => {
    boton.addEventListener("click", () => {
        let idProducto = boton.id.split('-')[1];
        let producto = perfumesMasculinos.find(p => p.id == idProducto);
        agregarAlCarrito(producto, carrito);
        renderizarCarrito(carrito);
        setearCarrito(carrito);
    });
});
}
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
let contenedorCarrito = document.getElementById("contenedorCarrito");
contenedorCarrito.innerHTML = "";
carrito.forEach(producto => {
    contenedorCarrito.innerHTML += `
    <div class="div__carrito">
    <p class = "subtitulo__perfume" >Nombre: ${producto.nombre}</p>
    <p class = "subtitulo__perfume" >Precio unitario: $${producto.precioUnitario}</p>
    <p class = "subtitulo__perfume">Unidades: ${producto.unidades}</p>
    <p class = "subtitulo__perfume">Subtotal: $${producto.subtotal}</p>
    <hr>
    </div>
    `

});
sumaTotalDelCarrito(carrito);
}
// Con esta funcion nos damos cuenta del precio total de los productos en el carrito
function sumaTotalDelCarrito(carrito) {
let total = carrito.reduce((acum, prod) => {
    let subtotal = prod.precioUnitario * prod.unidades;
    return acum + subtotal
}, 0)
let contenedorTotal = document.getElementById("total")
contenedorTotal.innerHTML = ""
let infoTotal = document.createElement("h3")
infoTotal.innerHTML = `Total: $${total}`
contenedorTotal.appendChild(infoTotal)
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
let botonVerCarrito = document.getElementById("boton__carrito")
botonVerCarrito.addEventListener("click", verOcultar)

function verOcultar(e) {
if (e.target.innerText === "Carrito") {
    e.target.innerText = "Producto"
} else {
    e.target.innerText = "Carrito"
}

let contenedorProductos = document.getElementById("pagina__productos")
let contenedorCarrito = document.getElementById("pagina__carrito")

contenedorCarrito.classList.toggle("oculto")
contenedorProductos.classList.toggle("oculto")
sumaTotalDelCarrito(carrito)
}


let botonFinalizar = document.getElementById("fin")
botonFinalizar.addEventListener("click", finalizarCompra)