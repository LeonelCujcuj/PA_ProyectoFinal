var idProducto = document.getElementById('idProducto') 
var nombreProducto = document.getElementById('nombreProducto') 
var descripcionProducto = document.getElementById('descripcionProducto') 
var categoriaProducto = document.getElementById('categoriaProducto') 
var existencia = document.getElementById('existencia') 
var precioVenta = document.getElementById('precioVenta') 
var error_div = document.getElementById('error')

var guardar = document.getElementById('guardar')
var cancelar = document.getElementById('cancelar')


let producto

var expMay = RegExp("[A-Z]")
var expMin = RegExp("[a-z]")
var expNum = RegExp("[0-9]")
const decimalRegex = /^-?\d+(\.\d+)?$/;
const textRegex = /^[a-zA-Z\s]+$/;


window.editar.recibirDatos('recibir-datos', function(event,args){
    console.log(args)
    producto = args[0]
    idProducto.value = producto['idProducto']
    nombreProducto.value =  producto['nombreProducto']
    descripcionProducto.value =  producto['descripcionProducto']
    categoriaProducto.value = producto['categoriaProducto']
    existencia.value = producto['existenciaProducto']
    precioVenta.value = producto['precioVenta']
})

guardar.addEventListener('click',function(){

    var error = ""
    if(!textRegex.test(categoriaProducto.value)){
        error += "La categoria no debe incluir numeros\n"
    }if(!existencia.value.match(expNum)){
        error += "La existencia debe de ser un numero entero\n"
    }if(!decimalRegex.test(precioVenta.value)){
        error += "El precio del producto debe de ingresarse con un decimal\n"
    }
    
    if (error==""){
        window.editar.editarRegistro([
            nombreProducto.value,
            descripcionProducto.value,
            categoriaProducto.value,
            existencia.value,
            precioVenta.value,
            idProducto.value
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
    categoriaProducto.value = "";
    existencia.value = "";
    precioVenta.value = "";
}