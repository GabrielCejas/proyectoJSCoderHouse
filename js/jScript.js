// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCompras = document.querySelector('#lista-compras');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    // Agregas al carrito presionando "Agregar al Carrito"
    listaCompras.addEventListener('click', agregarCompra);
    // Elimina articulos del carrito
    carrito.addEventListener('click', eliminarArticulo);
    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; 
        LimpiarHTML();
    })
}

// Funciones
function agregarCompra(evento){
    evento.preventDefault();
    if(evento.target.classList.contains('agregar-carrito')){
        const articuloSeleccionado = evento.target.parentElement.parentElement;
        leerDatosCard(articuloSeleccionado);
    }
}
// Elimina articulos del carrito
function eliminarArticulo(evento){
    console.log(evento.target.classList);
    if(evento.target.classList.contains('vaciar-carrito')){
        const articuloId = evento.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( articulo => articulo.id !== articuloId );
        carritoHTML();
    }
}

// Lee el contenido de la card y extrae la informacion 
function leerDatosCard(articulo){
    // Crear un objeto con el contendio del articulo actual
    const infoArticulo = {
        imagen: articulo.querySelector('img').src,
        titulo: articulo.querySelector('.productos__nombre').textContent,
        precio: articulo.querySelector('.productos__precio').textContent,
        id: articulo.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    // Revisa si un elemento ya exiate en el carrito
    const existe = articulosCarrito.some(articulo => articulo.id === infoArticulo.id);
    if(existe){
        // Actualizamos la cantidad
        const articulo = articulosCarrito.map( articulo => {
            if(articulo.id === infoArticulo.id){
                articulo.cantidad++;
                return articulo;
            }else{
                return articulo;
            }
        });
        articulosCarrito = [...articulo];
    }else{
        //Agreganos el articulo al carrito
        articulosCarrito = [...articulosCarrito, infoArticulo];
    }
    // Agrega elementos al arreglo del carrito

    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML(){
    // Limpiar el HTML
    LimpiarHTML();
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( articulo => {
        const {imagen, titulo, precio, cantidad, id} = articulo;
        const row = document.createElement('tr');
        row.innerHTML =`
            <td>
                <img src='${imagen}'>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#"class="vaciar-carrito" data-id= "${id}">Borrar</a>
            </td>
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

function LimpiarHTML(){
    contenedorCarrito.innerHTML = '';
}



