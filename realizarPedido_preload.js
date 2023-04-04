const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'pedido',
    {
        guardarDatos:(datos) =>ipcRenderer.send('guardar-datos',datos),
        recibirDatos: (canal, callback) =>ipcRenderer.on('recibir-datos',callback),
        recibirProveedor: (callback) =>ipcRenderer.on('recibir-proveedor',callback),
        nuevoRegistro: (datos) => ipcRenderer.send('nuevoRegistro',datos)
    }
)
