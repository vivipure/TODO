const electron = require('electron')
const {app, BrowserWindow, Menu,} = electron

let win

app.on('ready',function () {
    win = new BrowserWindow({ width: 410, height: 650, frame: false, transparent: true})

    // 然后加载 app 的 index.html.
    win.loadFile('index.html')

    win.on('closed',function () {
        app.quit()
    })

    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)
})


const menuTemplate = [{
    label: 'Tools',
    submenu: [
        {
            label: 'Skin',
            accelerator:process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
            click() {
                addNewWindow()
            }
        },
        {
            label: 'Clear',
            accelerator:process.platform == 'darwin' ? 'Command+D' : 'Ctrl+D',
            click() {
                mainWindow.webContents.send('item:clear')
            }
        },
        {
            label: 'Quit',
            accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click() {
                app.quit()
            }
        }
    ]
}]
