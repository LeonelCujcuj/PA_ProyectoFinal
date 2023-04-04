let empleado = 12
var idProducto = document.getElementById('idProducto')
var cantidad = document.getElementById('cantidad')
let lista_proveedores = document.getElementById('idProveedor')
var error_div = document.getElementById('error')

var confirmar = document.getElementById('confirmar')
var cancelar = document.getElementById('cancelar')

var expNum = RegExp("[0-9]")

let producto
let proveedor

window.pedido.recibirDatos('recibir-datos', function(event,args){
    //console.log(args)
    producto = args[0]
    idProducto.value = producto['idProducto']
    idProducto.name = producto['nombreProducto']
})

/*

window.pedido.recibirProveedor('recibir-datos', function(event,datos){
    console.log(datos)
    proveedor = datos;

    datos.forEach(element => {
        console.log(element)
        let opcion = document.createElement('option')
        opcion.setAttribute('value',element['idProveedor'])
        opcion.text = element['nombreProveedor']
        lista_proveedores.add(opcion)
    })

        lista_proveedores.value = [i]['Productos_idProducto']
        idProveedor.value = proveedor['nombreProveedor']
})

*/


confirmar.addEventListener('click',function(){
    var error = ""
    if(!cantidad.value.match(expNum)){
        error = "La cantidad a solicitar debe de ser un numero entero\n"
    }

    if (error==""){
        window.pedido.nuevoRegistro([
            empleado,
            idProducto.value,
            lista_proveedores.value,
            cantidad.value,
        ]);
        window.close()
    }else{
        error_div.innerText = error
        limpiarImput()
    }
})

cancelar.addEventListener('click',function(){
    window.close()
})


function limpiarImput(){
    cantidad.value = "";
}