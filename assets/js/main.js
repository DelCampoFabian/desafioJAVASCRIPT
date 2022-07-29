const NAVTOGGLE = document.querySelector(".nav-toggle")
const NAVMENU = document.querySelector(".enlaces")

NAVTOGGLE.addEventListener("click", () => {
    NAVMENU.classList.toggle("nav-menu_visible")
})

//Clase para crear los productos 
class Producto {
    constructor(nombre, imagen, precio, id) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.id = id;
    }
}

let cantidadProductos = []
let carrito = []
let total = 0

let tarjetaContenedora
let contador = 0
let contenedorContador
let llamarApi
let object
let contenedorStorageNombre
let contenedorStorageId
let contenedorStoragePrecio


let listaDeProductos = []

let indumentaria1 = new Producto("Short", "ropaMujer6.jpg", 1500, 1)
let indumentaria2 = new Producto("Remera y corto", "ropaHombre2.jpg", 5300, 2)
let indumentaria3 = new Producto("Camiseta Boca Juniors", "ropaHombre3.jpg", 6500, 3)
let indumentaria4 = new Producto("Pantalon corto", "ropaHombre4.jpg", 1600, 4)
let indumentaria5 = new Producto("Remera", "ropaHombre5.jpg", 2200, 5)
let indumentaria6 = new Producto("Remera", "ropaHombre6.jpg", 2200, 6)
let accesorios1 = new Producto("Mancuerna", "mancuerna4.jpg", 7500, 7)
let accesorios2 = new Producto("Discos con agarre", "discos.jpg", 1500, 8)
let accesorios3 = new Producto("Barra", "barras12.jpg", 1200, 9)
let accesorios4 = new Producto("Mancuerna", "mancuernas3.jpg", 800, 10)
let accesorios5 = new Producto("Discos", "discos8.jpg", 1000, 11)
let accesorios6 = new Producto("Mancuernas", "barras11.jpg",1200, 12)
let suplemento1 = new Producto("Proteina Star Nutrition", "suplementos5.jpg", 2500, 13)
let suplemento2 = new Producto("Creatina Star Nutrition", "suplementos6.jpg", 1600, 14)
let suplemento3 = new Producto("Proteina HardCore", "suplementos4.jpg", 1100, 15)

listaDeProductos.push(indumentaria1, indumentaria2, indumentaria3, indumentaria4, indumentaria5, indumentaria6, )
listaDeProductos.push(accesorios1, accesorios2, accesorios3, accesorios4, accesorios5, accesorios6, )
listaDeProductos.push(suplemento1, suplemento2, suplemento3)


//FUNCIONES
function registrarHtml() {
    sumarCarrito = document.querySelector(".contador-productos")
    tarjetaContenedora = document.querySelector("#productos")
    llamarApi = document.querySelector(".productos__verMas")

}

function registrarProductos() {
    sumarCarrito.innerText = `${cantidadProductos.length}`
}

// Función para crear las cards de productos
function tarjetaDom(producto) {
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

function obtenerApi() {
    fetch("https://62e2df9db54fc209b881e38a.mockapi.io/productos")
        .then((response) => response.json())
        .then((data) => {
            listaDeProductos.push(...data)
        })
}
function pintarProductosApi(){
    llamarApi.addEventListener("click",()=>{
        let productosApi = listaDeProductos.filter((producto) => producto.id >= 16)
        productosApi.forEach((producto) => {
            tarjetaContenedora.innerHTML += tarjetaDom(producto)
        })
        generarCarrito()
        llamarApi.classList.toggle("registro__invisible")
    })
}

/* Función cartel de compra */
function cartelProductoAgregado() {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        style: {
            background: "linear-gradient(90deg, rgba(0,147,147,1) 0%, rgba(0,224,198,1) 100%)",
            color: "#000",
            padding: "15px",
            margin: "50px 0 0 0"
        },
        gravity: "top",
    }).showToast();
}

function almacenarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
    localStorage.setItem("contador", JSON.stringify(cantidadProductos))
}

function obtenerStorage() {
    //Storage de cantidad de productos en el carrito
    let storageCantProductos = localStorage.getItem("contador")
    let numeroProductos = JSON.parse(storageCantProductos);
    cantidadProductos = numeroProductos;
    contenedorContador = cantidadProductos.length;
    sumarCarrito.innerText = `${contenedorContador}`

    //Storage de la lista de productos
    let storage = localStorage.getItem("carrito");
    object = JSON.parse(storage);
    carrito = object
    carrito.forEach((producto) => {
        contenedorStorageNombre = producto.nombre;
        contenedorStorageId = producto.id;
        contenedorStoragePrecio = producto.precio;
    })
}

//TARJETA PARA CONTENER Y PINTAR LAS CARDS DE PRODUCTOS 
function pintarCards(){
    listaDeProductos.forEach((producto) => {
        tarjetaContenedora.innerHTML += tarjetaDom(producto)
    })
}


//GENERACION DE CARRITO
function generarCarrito(){
    let botones = document.querySelectorAll(".boton");
    let arrayBotones = Array.from(botones)
    arrayBotones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            let productoSeleccionado = listaDeProductos.find((producto) => producto.id == e.target.id);
            carrito.push(productoSeleccionado);
            ++contador
            cantidadProductos.push(contador)
            total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio, 0)
            almacenarStorage()
            registrarProductos()
            cartelProductoAgregado()
        })
    })
}


function main() {
    registrarHtml()
    pintarCards()
    generarCarrito()
    obtenerApi()
    obtenerStorage()
    pintarProductosApi()
}
main()