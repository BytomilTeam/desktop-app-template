const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

function createWindow(){
    const window = new BrowserWindow({
        minHeight: 600,
        minWidth: 800,
        width: 800,
        height: 600,
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true,
            enableRemoteModule: true
        },
    })

    window.removeMenu()

    ipcMain.on("buttonClicked", (e,name) => {
        const names = {
            "OMI":"Álvaro",
            "BYT":"Alejandro",
            "BIT":"Alejandro",
            "BITT":"Alejadro"
        }

        // envia el nombre a la consola
        console.log(name)

        if(names[name.toUpperCase()]){
            window.webContents.send("auth", names[name.toUpperCase()])
        } else {
            window.webContents.send("auth", undefined)
        }
    })
    
    window.loadURL(
        isDev 
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname,"../build/index.html")}`)
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit()
    }
})

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})