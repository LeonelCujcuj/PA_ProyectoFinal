const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'editar',
    {
        guardarDatos:(datos) =>ipcRenderer.send('guardar-datos',datos),
        recibirDatos: (canal, callback) =>ipcRenderer.on('recibir-datos',callback),
        editarRegistro: (datos) => ipcRenderer.send('editarRegistro',datos)
    }
)
