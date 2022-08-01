//Registro de variables

let registroNombre
let registroId
let registroPrecio
let registrarTotal
let sumarCarrito
let registroIniciarCompra
let sacarRegistro
let refrescar
let refrescarFormulario
let mostrarFormulario
let formulario
let cantInicioCompra
let totalPrecioPagar
let contenedorStorageNombre
let contenedorStorageId
let contenedorStoragePrecio
let total

function registrarHtml() {
    registroNombre = document.querySelector("#registro-nombre");
    registroId = document.querySelector("#registro-id");
    registroPrecio = document.querySelector("#registro-precio");
    registrarTotal = document.querySelector("#registro-total");
    sumarCarrito = document.querySelector(".contador-productos");
    registroIniciarCompra = document.querySelector(".inicio-boton__comprar");
    sacarRegistro = document.querySelector(".registro__productos");
    mostrarFormulario = document.querySelector(".compra-registro");
    formulario = document.getElementById("Formulario");
    cantInicioCompra = document.querySelector(".inicio-compra__cantidad");
    totalPrecioPagar = document.querySelector(".inicio-compra__total");
    refrescar = document.querySelector(".boton-cancelar");
    refrescarFormulario = document.querySelector(".boton-form__cancelar");
}
registrarHtml()

registroIniciarCompra.addEventListener("click", () => {
    if (total !== 0) {
        agregarQuitarClases()
    } else {
        Toastify({
            text: "Ingrese un producto",
            duration: 1500,
            close: false,
            style: {
                margin:"50px",
                background: "#00e0c6",
                color: "#000",
                padding: "15px",
            },
            position:"right",
            gravity:"top"
        }).showToast();
    }
})

//Agregar o quitar las clases del contenedor del formulario y la lista de productos seleccionados
function agregarQuitarClases() {
    sacarRegistro.classList.toggle("registro__invisible");
    mostrarFormulario.classList.toggle("registro__visible");
}

function almacenarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("contador", JSON.stringify(cantidadProductos));
}

function obtenerStorage() {
    let storage = localStorage.getItem("carrito");
    object = JSON.parse(storage);
    carrito = object;
    carrito.forEach((producto) => {
        contenedorStorageNombre = producto.nombre;
        contenedorStorageId = producto.id;
        contenedorStoragePrecio = producto.precio;
        mantenerLista()
    })
    let storageCantProductos = localStorage.getItem("contador");
    let numeroProductos = JSON.parse(storageCantProductos);
    cantidadProductos = numeroProductos;
    contenedorContador = cantidadProductos.length;
    sumarCarrito.innerText = `${contenedorContador}`;
    cantInicioCompra.innerHTML = `Cantidad de productos: <span>${contenedorContador}</span>`;
    totalPrecioPagar.innerHTML = `Total a pagar: <span>$ ${totalStorage()}</span>`;
}
function mantenerLista() {
    registroNombre.innerHTML += `<li>${contenedorStorageNombre}</li>`;
    registroId.innerHTML += `<li>${contenedorStorageId}</li>`;
    registroPrecio.innerHTML += `<li>$ ${contenedorStoragePrecio}</li>`;
    registrarTotal.innerHTML = `<li>$ ${totalStorage()}</li>`;
}
function totalStorage() {
    total = 0
    for (let i = 0; i < object.length; i++) {
        total += object[i].precio;
    }
    return total
}
//Funcion para validar compra
function realizarCompra() {
    formulario.onsubmit = (event) => {
        validarFormulario(event);
        cartelCompraRealizada();
        refrescarRegistro();
    }
}
//Función para validar el formulario
function validarFormulario(event) {
    event.preventDefault();
    formulario.reset();
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 2000);
}

//Cartel compra finalizada
function cartelCompraRealizada() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra Exitosa',
        showConfirmButton: false,
        timer: 2000
    })
}

//Cartel compra cancelada
function cartelCompraCancelada() {
    Toastify({
        text: "Compra cancelada",
        duration: 3000,
        close: true,
        style: {
            background: "linear-gradient(90deg, rgba(0,180,219,1) 0%, rgba(0,131,219,1) 100%)",
            color: "#000",
            padding: "15px",
        },
        gravity: "bottom",
    }).showToast();
}

//Vacia el contenido de las listas de registro
function limpiarCarrito() {
    registroNombre.innerHTML = "";
    registroPrecio.innerHTML = "";
    registroId.innerHTML = "";
    registrarTotal.innerHTML = "";
    sumarCarrito.innerText = "0";
    cantInicioCompra.innerHTML = `Cantidad de productos: <span>0</span>`;
    totalPrecioPagar.innerHTML = `Total a pagar: <span>$ 0</span>`;
}

//función para borrar los productos seleccionados
function refrescarRegistro() {
    limpiarCarrito();
    carrito = [];
    cantidadProductos = [];
    almacenarStorage();
}

//Borrar la lista de productos seleccionados
refrescar.addEventListener("click", (e) => {
    refrescarRegistro()
    if (total > 0) {
        cartelCompraCancelada()
    } 
    total = 0;
})

//Salir del formulario de compras
refrescarFormulario.addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success m-2',
            cancelButton: ' btn btn-danger m-2'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: '¿Desea cancelar la compra?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Compra cancelada',
            )
            agregarQuitarClases()
        }
    })
})

function main() {
    realizarCompra()
    obtenerStorage()
}
main()