var ingresar = document.getElementById('boton_ingresar')
var nameLogin = document.getElementById('name')
var passLogin = document.getElementById('pass')
var error_div = document.getElementById('error')
var guardar = document.getElementById('boton_guardar')


var expMay = RegExp("[A-Z]")
var expMin = RegExp("[a-z]")
var expNum = RegExp("[0-9]")


ingresar.addEventListener('click',function(event){
    event.preventDefault();

    if(nameLogin.value.match(expNum)){
        errorUsuario()
        limpiarImput()
    }else{ 
        window.login.registroValido([
            nameLogin.value,
            passLogin.value
        ]);
    }
})


window.login.inicioError('inicio-error',function(event,args){
    error_div.innerText = args
})


function errorUsuario(){
    error_div.innerText = "El nombre del usuario no debe llevar numeros \n"
}

function limpiarImput(){
    nameLogin.value = "";
    passLogin.value = "";
}


guardar.addEventListener('click',function(event){
    event.preventDefault();

    window.login.nuevoEmpleado([
        2023,
        nameLogin.value,
        passLogin.value,
        'Cajero'
    ]);
})



window.login.inicioCorrecto(function(event, args){
    console.log(args)
})