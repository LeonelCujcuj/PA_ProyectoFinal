const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// conección a la base de datos sql
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'jcujcuj',
    password: 'galileo2023',
    database: 'inventario'
  });

// ventanas
let v_login;
let v_listadoProductos;
let v_editarProducto;
let v_realizarPedido;

function create_login(){
    v_login = new BrowserWindow({
        width: 1600,
        height: 950,
        webPreferences:({
            preload: path.join(app.getAppPath(),'validacion_preload.js'),
        })
    })
    v_login.loadFile('validacion.html')
}

function create_listadoProductos(){
    v_listadoProductos = new BrowserWindow({
        width: 1600,
        height: 950,
        webPreferences:({
            preload: path.join(app.getAppPath(),'listadoProductos_preload.js'),
        })
    })
    v_listadoProductos.loadFile('listadoProductos.html')
    verProductos()
}

function create_editarProducto(datos){
    v_editarProducto = new BrowserWindow({
        width: 1600,
        height: 950,
        webPreferences:({
            preload: path.join(app.getAppPath(),'editarProducto_preload.js'),
        }),
        parent: v_listadoProductos
    })
    v_editarProducto.loadFile('editarProducto.html')
    v_editarProducto.webContents.on('did-finish-load',()=>{
        v_editarProducto.webContents.send('recibir-datos',
        datos)
    })
}

function create_realizarPedido(datos){
    v_realizarPedido = new BrowserWindow({
        width: 1600,
        height: 950,
        webPreferences:({
            preload: path.join(app.getAppPath(),'realizarPedido_preload.js'),
        }),
        parent: v_listadoProductos
    })
    v_realizarPedido.loadFile('realizarPedido.html')
    v_realizarPedido.webContents.on('did-finish-load',()=>{
        v_realizarPedido.webContents.send('recibir-datos', datos)
    })
}

app.whenReady().then(create_login)
// ipcMain.on = recibir
// ipcMain.send = enviar

// validar usuario

ipcMain.on('registroValido',function(event,args){
    conexion.promise().execute(`SELECT * FROM empleados WHERE username = '${args[0]}'`)
    .then(
        ([results,fields])=>{
            if(results.length == 1){
               return bcrypt.compare(args[1], results[0]['password'])
            }
        })
        .then((result)=>{
                if(result){
                    create_listadoProductos()
                    v_login.close()
                }else{
                    v_login.webContents.send('inicio-error','El usuario o la contraseña no existen')
                }  
            })
        })


/* funciones CRUD */

ipcMain.on('nuevoEmpleado', function(event,args){
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(args[2], salt, function(err, hash) {
          //  console.log(args)
            conexion.promise().execute('INSERT INTO empleados(codigoEmpleado, username, password, puestoEmpleado) VALUES (?,?,?,?)',
            [args[0],args[1],hash,args[3]])
            .then(([results,fields])=>{
                console.log(results)
            })
            .catch((err)=>{
                console.log(err)
            })
        });
    });
})


ipcMain.on('nuevoRegistro', function(event,args){
   // console.log(args)
    conexion.promise().execute('INSERT INTO pedido(Empleados_idEmpleado, Productos_idProducto, Proveedores_idProveedor, cantidad) VALUES (?,?,?,?)',
    args)
})


ipcMain.on('editarRegistro', function(event,args){
  // console.log(args)
    conexion.promise().execute('UPDATE productos SET nombreProducto = ?, descripcionProducto = ?, categoriaProducto = ?, existenciaProducto = ?, precioVenta = ? WHERE idProducto = ? ',
    args)
})


/** prueba de conección **/
/*
conexion.promise().query('SELECT * FROM productos')
.then(
    ([result,fields])=>{
        console.log(result)
    }
)
.catch((err)=>{
    console.log(err)
})*/


/* funciones CRUD */

function verProductos(){
    conexion.promise().query('SELECT * FROM productos')
    .then(
        ([result,fields])=>{
      //      console.log(result)
            v_listadoProductos.webContents.on('did-finish-load', function(){
                v_listadoProductos.webContents.send('recibir-datos', result)
            })
        })
}


ipcMain.on('editar-producto',function(event,args){
  //  console.log(args)
    conexion.promise()
            .execute(`SELECT * FROM productos WHERE idProducto = '${args['idProducto']}'`)
    .then(([results, fields])=>{
    //    console.log(results)
        create_editarProducto([args,results])
        
    })
})


ipcMain.on('pedir-producto',function(event,args){
  //  console.log(args)
    var dato = args['idProducto']
    conexion.promise()
            .execute(`SELECT * FROM productos WHERE idProducto = '${dato}'`)
    .then(([results, fields])=>{
      //  console.log(results)
        create_realizarPedido([args,results])
        verProveedoresProductos(dato)
    })
})



function verProveedoresProductos(dato){
    conexion.promise().query(`SELECT productos_proveedores.Productos_idProducto, proveedores.idProveedor, proveedores.nombreProveedor
    FROM productos_proveedores 
    INNER JOIN proveedores
    On productos_proveedores.Proveedores_idProveedor=proveedores.idProveedor
    WHERE Productos_idProducto = ${dato};`)
    .then(
        ([result,fields])=>{
            console.log(result)
            v_realizarPedido.webContents.on('did-finish-load', function(){
                v_realizarPedido.webContents.send('recibir-proveedor', result)
            })
        })
}
