const NAVTOGGLE = document.querySelector(".nav-toggle")
const NAVMENU = document.querySelector (".enlaces")

NAVTOGGLE.addEventListener("click", () => {
    NAVMENU.classList.toggle("nav-menu_visible")
})

//CLASES 
class Producto {
    constructor (id, nombre,imagen, precio){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
    }
}

let carrito = []
let total = 0


let listaDeProductos = []

let indumentaria1 = new Producto (1, "Short", "ropaMujer6.jpg", 1500 )
let indumentaria2 = new Producto (2, "Remera y corto", "ropaHombre2.jpg", 5300 )
let indumentaria3 = new Producto (3, "Camiseta Boca Juniors", "ropaHombre3.jpg", 6500)
let indumentaria4 = new Producto (4, "Pantalon corto", "ropaHombre4.jpg", 1600)
let indumentaria5 = new Producto (5, "Remera", "ropaHombre5.jpg", 2200 )
let indumentaria6 = new Producto (6, "Remera", "ropaHombre6.jpg", 2200)
let accesorios1 = new Producto (7,"Mancuerna", "mancuerna4.jpg", 7500)
let accesorios2 = new Producto (8,"Discos con agarre", "discos.jpg", 1500)
let accesorios3 = new Producto (9,"Barra", "barras12.jpg", 1200)
let accesorios4 = new Producto (10,"Mancuerna", "mancuernas3.jpg", 800)
let accesorios5 = new Producto (11,"Discos", "discos8.jpg", 1000)
let accesorios6 = new Producto (12,"Mancuernas", "barras11.jpg", 3500)

listaDeProductos.push (indumentaria1,indumentaria2,indumentaria3,indumentaria4,indumentaria5,indumentaria6,)
listaDeProductos.push (accesorios1,accesorios2,accesorios3,accesorios4,accesorios5,accesorios6,)

//REGISTRAR VARIABLES
let registroNombre
let registroId
let registroPrecio
let registrarTotal
let contenedorNombre
let contenedorId
let contenedorPrecio
let textoTotal
let object
let contenedorStorageNombre
let contenedorStorageId
let contenedorStoragePrecio

//FUNCIONES
function registrarHtml(){
    registroNombre = document.querySelector("#registro-nombre");
    registroId = document.querySelector("#registro-id");
    registroPrecio = document.querySelector("#registro-precio");
    registrarTotal = document.querySelector("#registro-total");
}

function recorridoArray(){
    carrito.forEach((producto) =>{
        contenedorNombre = producto.nombre; 
        contenedorId = producto.id;
        contenedorPrecio = producto.precio;
    })
}

function registrarProductos(){  
    registroNombre.innerHTML += `<li>${contenedorNombre}</li>`;
    registroId.innerHTML += `<li>${contenedorId}</li>`
    registroPrecio.innerHTML += `<li>$ ${contenedorPrecio}</li>`
    registrarTotal.innerHTML = `<li>$ ${total}</li>`
}

function tarjetaDom(producto){
    let tarjetaDom =
        `<div class="productos p-0">
            <div class="productos__img">
            <img src="./assets/img/${producto.imagen}">
            </div>
            <div class="productos__text">
                <h4>${producto.nombre}</h4>
                <p>$ ${producto.precio}</p>
                <button id="${producto.id}" class="boton">Agregar al carrito</button>        
            </div>
        </div>`;
    return tarjetaDom
}



function limpiarCarrito() {
    registroNombre.innerHTML = "";
    registroPrecio.innerHTML = "";
    registroId.innerHTML = "";
    registrarTotal.innerHTML= "";    
}

function almacenarStorage(){
    localStorage.setItem("carrito", JSON.stringify (carrito))
}

function obtenerStorage (){
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

//tarjeta contenedora

let tarjetaContenedora = document.querySelector ("#productos");
listaDeProductos.forEach (producto => {
    tarjetaContenedora.innerHTML += tarjetaDom(producto)
} )
// Generacion de carrito

let botones = document.querySelectorAll(".boton");
let arrayBotones = Array.from (botones)
arrayBotones.forEach (boton => {
    boton.addEventListener("click", (e) => {
        let productoSeleccionado = listaDeProductos.find (producto => producto.id == e.target.id);
        carrito.push(productoSeleccionado);
        total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio, 0 )
        almacenarStorage()
        recorridoArray()
        registrarProductos()
        Toastify({
            text: "Producto agregado",
            duration: 3000,
            close: true,
            style: {
                background:"linear-gradient(90deg, rgba(0,147,147,1) 0%, rgba(0,224,198,1) 100%)",
                color: "#000",
                padding : "15px",
                margin: "50px 0 0 0"
            },
            gravity: "top",
        }).showToast();
    })
})

let refrescar = document.querySelector(".boton-cancelar")
refrescar.addEventListener("click", (e) =>{
    limpiarCarrito()
    carrito = []
    almacenarStorage()
})

function main (){
    registrarHtml()
    obtenerStorage()

}
main()










