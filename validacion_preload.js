const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'login',
    {
        inicioError: (canal, callback) =>ipcRenderer.on('inicio-error',callback),
        registroValido: (datos) => ipcRenderer.send('registroValido', datos),
        inicioCorrecto: (callback) => ipcRenderer.on('inicioCorrecto', callback),
        nuevoEmpleado: (datos) => ipcRenderer.send('nuevoEmpleado',datos)
    }
)