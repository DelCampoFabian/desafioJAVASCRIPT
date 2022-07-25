let registroNombre
let registroId
let registroPrecio
let registrarTotal
let sumarCarrito
let registroIniciarCompra
let sacarRegistro
let mostrarFormulario
let formulario

let contenedorStorageNombre
let contenedorStorageId
let contenedorStoragePrecio

function registrarHtml(){
    registroNombre = document.querySelector("#registro-nombre");
    registroId = document.querySelector("#registro-id");
    registroPrecio = document.querySelector("#registro-precio");
    registrarTotal = document.querySelector("#registro-total");
    sumarCarrito = document.querySelector(".contador-productos");
    registroIniciarCompra = document.querySelector(".inicio-boton__comprar");
    sacarRegistro= document.querySelector(".registro__productos");
    mostrarFormulario = document.querySelector (".compra-registro");
    formulario= document.getElementById("Formulario")
}
registrarHtml()

registroIniciarCompra.addEventListener("click", () => {
    agregarQuitarClases()
})

function agregarQuitarClases(){
    sacarRegistro.classList.toggle("registro__invisible")
    mostrarFormulario.classList.toggle("registro__visible")
}


function almacenarStorage(){
    localStorage.setItem("carrito", JSON.stringify (carrito))
    localStorage.setItem("contador", JSON.stringify(cantidadProductos))
}

function obtenerStorage(){
    let storageCantProductos = localStorage.getItem("contador")
    let numeroProductos = JSON.parse(storageCantProductos);
    cantidadProductos= numeroProductos;
    contenedorContador = cantidadProductos.length;
    sumarCarrito.innerText = `${contenedorContador}`

    let storage = localStorage.getItem("carrito");
    object = JSON.parse(storage);
    carrito = object
    carrito.forEach ((producto) => {
        contenedorStorageNombre = producto.nombre;
        contenedorStorageId = producto.id;
        contenedorStoragePrecio= producto.precio;
        mantenerLista()
    }) 
}

function mantenerLista(){  
    registroNombre.innerHTML += `<li>${contenedorStorageNombre}</li>`;
    registroId.innerHTML += `<li>${contenedorStorageId}</li>`
    registroPrecio.innerHTML += `<li>$ ${contenedorStoragePrecio}</li>`
    registrarTotal.innerHTML = `<li>$ ${totalStorage()}</li>`
}

function totalStorage(){
    let total = 0
    for (let i = 0; i < object.length; i++){
        total += object[i].precio;
    }
    return total
}

//Funcion para validar 
function realizarCompra (){
    formulario.onsubmit = (event) =>{
        validarFormulario (event);
        cartelCompraRealizada()
        refrescarRegistro() 
    } 
}

//Función para validar el formulario
function validarFormulario (event){
    event.preventDefault()
    formulario.reset()
    setTimeout(function agregarQuitarClases(){
        sacarRegistro.classList.toggle("registro__invisible")
        mostrarFormulario.classList.toggle("registro__visible")
    },2000);
    
}

//Cartel compra finalizada
function cartelCompraRealizada (){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra Exitosa',
        showConfirmButton: false,
        timer: 2000
      })
}

//Función del cartel de la compra cancelada
function cartelCompraCancelada(){
    Toastify({
        text: "Compra cancelada",
        duration: 3000,
        close: true,
        style: {
            background:"linear-gradient(90deg, rgba(0,180,219,1) 0%, rgba(0,131,219,1) 100%)",
            color: "#000",
            padding : "15px",
        },
        gravity: "bottom",
    }).showToast();
}

//Vacia el contenido de las listas de registro
function limpiarCarrito() {
    registroNombre.innerHTML = "";
    registroPrecio.innerHTML = "";
    registroId.innerHTML = "";
    registrarTotal.innerHTML= "";    
    sumarCarrito.innerText = "0"
}

//función para borrar los productos seleccionados
function refrescarRegistro(){
    limpiarCarrito()
    carrito = []
    cantidadProductos = []
    almacenarStorage()
    
}

//Borrar la lista de productos seleccionados
let refrescar = document.querySelector(".boton-cancelar")
refrescar.addEventListener("click", (e) =>{
    refrescarRegistro()
    cartelCompraCancelada()
})

realizarCompra()
obtenerStorage()

