var botonEditar = document.getElementById('editarProducto')
var botonPedir = document.getElementById('realizarPedido')
var botonSeleccionado = document.getElementById('selecionado')
var elegido = document.getElementById('elegido')

botonEditar.addEventListener('click',editarProducto)
botonPedir.addEventListener('click',pedirProducto)

let tabla = document.getElementById('tablaProductos')
let productos;

window.lista.recibirDatos('recibir-datos',function(event,datos){
    console.log(datos)
    productos = datos;
    for(let i = 0; i<datos.length;i++){
        let id = datos[i]['idProducto']
        let nombre = datos[i]['nombreProducto']
        let descripcion = datos[i]['descripcionProducto']
        let categoria = datos[i]['categoriaProducto']
        let existencia = datos[i]['existenciaProducto']
        let precio = datos[i]['precioVenta']

        let botonEditar = document.createElement('button')
        botonEditar.setAttribute('value',id)
        botonEditar.setAttribute("id","editar")
        botonEditar.setAttribute("class","nav-link")
        botonEditar.innerText = 'Editar'
        botonEditar.addEventListener('click', editarProducto)

        let botonPedir = document.createElement('button')
        botonPedir.setAttribute('value',id)
        botonPedir.setAttribute("id","pedir")
        botonPedir.setAttribute("class","nav-link")
        botonPedir.innerText = 'Pedir'
        botonPedir.addEventListener('click', pedirProducto)

        let celdaId = document.createElement('td')
        celdaId.innerText = id
        
        let celdaNombre = document.createElement('td')
        celdaNombre.innerText = nombre

        let celdaDescripcion = document.createElement('td')
        celdaDescripcion.innerText = descripcion

        let celdaCategoria = document.createElement('td')
        celdaCategoria.innerText = categoria

        let celdaExistencia = document.createElement('td')
        celdaExistencia.innerText = existencia

        let celdaPrecio = document.createElement('td')
        celdaPrecio.innerText = 'Q '+ precio

        let celdaBotonEditar = document.createElement('td')
        celdaBotonEditar.appendChild(botonEditar)
        
        let celdaBotonPedir = document.createElement('td')
        celdaBotonPedir.appendChild(botonPedir)
        
        let fila = document.createElement('tr')        

        fila.appendChild(celdaId)
        fila.appendChild(celdaNombre)
        fila.appendChild(celdaDescripcion)
        fila.appendChild(celdaCategoria)
        fila.appendChild(celdaExistencia)
        fila.appendChild(celdaPrecio)
       fila.appendChild(celdaBotonEditar)
       fila.appendChild(celdaBotonPedir)

         tabla.appendChild(fila)
    }
})

/* botones dentro de la tabla */

function pedirProducto(event){
   console.log(event.target.value)
   elegido.innerHTML = event.target.value
   window.lista.pedirproducto(productos[event.target.value - 1])
}

function editarProducto(event){
   console.log(event.target.value)
   elegido.innerHTML = event.target.value
   window.lista.editarproducto(productos[event.target.value - 1])
}



/* Prueba botones fuera de la tabla

var seleccion = elegido.value;


function seleccionProducto(event){
    console.log(event.target.value)
    elegido.innerHTML = event.target.value
    window.lista.seleccionarElemento(productos[event.target.value - 1])
}

function editarProducto(event){
   console.log(`va a pedir el producto ${seleccion}`)
}

function pedirProducto(event){
   console.log(`pedir mas producto ${seleccion}`)
}*/