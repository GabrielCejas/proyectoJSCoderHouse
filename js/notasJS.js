// Formulario de Notas
// Variables
const formulario = document.querySelector('#formulario');
const registro = document.querySelector('#lista');
let nombreApellido = [];

// Event Listenesr
eventListener();

function eventListener(){
    // Cuando el usuario agrega una nueva Nota
    formulario.addEventListener('submit', agregarNombre);
    // Cuando en documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        nombreApellido = JSON.parse(localStorage.getItem('nombreApellido')) || [];
        crearHTMl();
    });
}

// Funciones
function agregarNombre(e){
    e.preventDefault();
    //Textarea donde el usuario escribe su nota
    const lista = document.querySelector('#nombre').value;
    //Validacion
    if(lista === ''){
        mostrarError('No puede ir vacio el formulario');
        return;
    }
    const listaObj = {
        id: Date.now(),
        lista
    }
    nombreApellido = [...nombreApellido, listaObj];
    crearHTMl();

    formulario.reset();

}

// Mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}
function crearHTMl() {
    limpiarHTML()
    if(nombreApellido.length > 0){
        nombreApellido.forEach(lista => {
            // Agreagr un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-msj');
            btnEliminar.innerText = 'Borrar';
            // añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarMsj(lista.id);
            }

            const li = document.createElement('li');
            // Añadir Texto
            li.innerHTML = lista.lista;
            // Asignar boton
            li.appendChild(btnEliminar);
            registro.appendChild(li);
        });
    }
    sincronizarStore();
}
// Agrega al Localstorage
function sincronizarStore(){
    localStorage.setItem('nombreApellido', JSON.stringify(nombreApellido));
}
// Elimina msj 
function borrarMsj(id){
    nombreApellido = nombreApellido.filter(lista => lista.id !== id);
    crearHTMl();
}
function limpiarHTML(){
    while (registro.firstChild){
        registro.removeChild(registro.firstChild);
    }
}

//----------- AJAX Con jQuery------------------//

const URLGET = "https://jsonplaceholder.typicode.com/users";

$(".ajax").prepend('<button class="boton botonAJAX">Consultar API</button>');

$(".botonAJAX").click(() =>{
    $.get(URLGET, function (respuesta, estado){
        if(estado === "success"){
            let datos = respuesta;
            for (const dato of datos){
                $(".ajax").prepend(`<div>
                                    <h3>ID: ${dato.id}</h3>
                                    <h3>Nombre: ${dato.name}</h3>
                                    <p>eMail: ${dato.email}</p>
                                    <p>Direccion: ${dato.address.street}</p>
                                    <p>Numero: ${dato.address.suite}</p>
                                    <p>Ciudad: ${dato.address.city}</p>
                                    </div>`);
            }
        }
    });
});