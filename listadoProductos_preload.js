const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'lista',
    {
        seleccionarElemento:(datos) =>ipcRenderer.send('seleccionar-elemento',datos),
        recibirDatos: (canal, callback) =>ipcRenderer.on('recibir-datos',callback),
        editarproducto:(datos) =>ipcRenderer.send('editar-producto',datos),
        pedirproducto:(datos) =>ipcRenderer.send('pedir-producto',datos)
    }
)