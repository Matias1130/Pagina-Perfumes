fetch("./data2.json")
    .then(response => response.json())
    .then(productos => encierraTodo(productos))
    .catch(error => console.log(error))

function encierraTodo(perfumesFemeninos) {
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
        agregarEventListenersBotonesAgregar()
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
    function agregarEventListenersBotonesAgregar() {
        let botonesAgregarAlCarrito = document.querySelectorAll('.boton');
        botonesAgregarAlCarrito.forEach(boton => {
            boton.addEventListener("click", () => {
                let idProducto = boton.id.split('-')[1];
                let producto = perfumesFemeninos.find(p => p.id == idProducto);
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
    }

    function renderizarCarrito(carrito) {
        let contenedorCarrito = document.getElementById("contenedorCarritoFemenino");
        contenedorCarrito.innerHTML = "";
        carrito.forEach(({ id, nombre, precioUnitario, unidades, subtotal}) => {
            let tarjetaCarrito = document.createElement("div")
            tarjetaCarrito.className = "div__carrito"
            tarjetaCarrito.id = "tcf" + id
            tarjetaCarrito.innerHTML += `
        <p class = "subtitulo__perfume" >Nombre: ${nombre}</p>
        <p class = "subtitulo__perfume" >Precio unitario: $${precioUnitario}</p>
        <p class = "subtitulo__perfume">Unidades: ${unidades}</p>
        <p class = "subtitulo__perfume">Subtotal: $${subtotal}</p>
        <button class="boton__eliminar" id=bef${id}>Eliminar</button>
        `
        contenedorCarrito.appendChild(tarjetaCarrito)
        let btnEliminar = document.getElementById("bef" + id)
        btnEliminar.addEventListener("click",(e) => eliminarProducto(e))
        });
        sumaTotalDelCarrito(carrito);
    }
    function eliminarProducto(e) {
        let id = Number(e.target.id.substring(3))
        let carrito = obtenerCarrito()
        carrito = carrito.filter(producto => producto.id !== id)
        setearCarrito(carrito)
        let nodoProducto = document.getElementById("tcf" + id)
        nodoProducto.remove()
        let carritoStorage = localStorage.getItem("carrito")
        if (carritoStorage === "[]") {
            localStorage.removeItem("carrito")
        }
        sumaTotalDelCarrito(carrito)
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
        let carritoStorage = localStorage.getItem("carrito")
        if(carritoStorage){
        localStorage.removeItem("carrito");
        carrito.length = 0;
        renderizarCarrito([]);
        lanzarAlertaFemenino();
        }else{
            alertaCarritoVacio()
        }
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

    function lanzarAlertaFemenino() {
        Swal.fire({
            title: "Pedido realizado con exito!",
            text: "En breve recibiras un mail con toda la informacion.",
            imageUrl: "../assets/Imagenes/logo2.png",
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
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #eeaeae, #bc94e9)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }
    function alertaCarritoVacio(){
        Swal.fire({
            icon: "error",
            title: "Parece que no hay nada en el carrito",
            text: "Asegurate de que el carrito contenga productos para realizar la compra",
        });
    }
}