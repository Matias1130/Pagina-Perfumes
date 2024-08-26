
fetch("./data.json")
    .then(response => response.json())
    .then(productos => encierraTodo(productos))
    .catch(error => console.log(error))



function encierraTodo(perfumesMasculinos) {
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
        agregarEventListenersBotonesAgregar();
    }
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
    //funcion para agregar eventos a todos los botones
    function agregarEventListenersBotonesAgregar() {
        let botonesAgregarAlCarrito = document.querySelectorAll('.boton');
        botonesAgregarAlCarrito.forEach(boton => {
            boton.addEventListener("click", () => {
                let idProducto = boton.id.split('-')[1];
                let producto = perfumesMasculinos.find(p => p.id == idProducto);
                let carrito = obtenerCarrito();
                agregarAlCarrito(producto, carrito);
                setearCarrito(carrito);
                alertaSumaCarrito();
                renderizarCarrito(carrito);
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
        setearCarrito(carrito)
    }

    function renderizarCarrito(carrito) {
        let contenedorCarrito = document.getElementById("contenedorCarrito");
        contenedorCarrito.innerHTML = "";
        carrito.forEach(({ id, nombre, precioUnitario, unidades, subtotal }) => {
            let tarjetaCarrito = document.createElement("div")
            tarjetaCarrito.className = "div__carrito"
            tarjetaCarrito.id = "tc" + id
            tarjetaCarrito.innerHTML += `
        <p class = "subtitulo__perfume" >Nombre: ${nombre}</p>
        <p class = "subtitulo__perfume" >Precio unitario: $${precioUnitario}</p>
        <p class = "subtitulo__perfume">Unidades: ${unidades}</p>
        <p class = "subtitulo__perfume">Subtotal: $${subtotal}</p>
        <button class="boton__eliminar" id=be${id}>Eliminar</button>
        `
            contenedorCarrito.appendChild(tarjetaCarrito)
            let btnEliminar = document.getElementById("be" + id)
            btnEliminar.addEventListener("click", (e) => eliminarProducto(e))
        });
        sumaTotalDelCarrito(carrito);
    }
    function eliminarProducto(e) {
        let id = Number(e.target.id.substring(2))
        let carrito = obtenerCarrito()
        carrito = carrito.filter(producto => producto.id !== id)
        setearCarrito(carrito)
        let nodoProducto = document.getElementById("tc" + id)
        nodoProducto.remove()
        let carritoStorage = localStorage.getItem("carrito")
        if (carritoStorage === "[]") {
            localStorage.removeItem("carrito")
        }
        sumaTotalDelCarrito(carrito)
        renderizarCarrito(carrito)
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
        let carritoStorage = localStorage.getItem("carrito")
        if (carritoStorage) {
            localStorage.removeItem("carrito");
            carrito.length = 0;
            renderizarCarrito([]);
            lanzarAlertaMasculino();
        } else {
            carrito.length = 0;
            renderizarCarrito([]);
            alertaCarritoVacio()
        }
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

    function lanzarAlertaMasculino() {
        Swal.fire({
            title: "Pedido realizado con exito!",
            text: "En breve recibiras un mail con toda la informacion.",
            imageUrl: "../assets/Imagenes/logomas.png",
            imageWidth: 300,
            imageHeight: 400,
            imageAlt: "Custom image"

        });
    }

    function alertaSumaCarrito() {

        Toastify({
            text: "Sumado al carrito!",
            duration: 3000,
            close: true,
            gravity: "bottom", 
            position: "left", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right, #2244c3, #2de9fd)",
            },
            onClick: function () { } 
        }).showToast();
    }
    function alertaCarritoVacio() {
        Swal.fire({
            icon: "error",
            title: "Parece que no hay nada en el carrito",
            text: "Asegurate de que el carrito contenga productos para realizar la compra",
        });
    }
}