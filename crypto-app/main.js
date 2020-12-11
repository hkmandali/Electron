const { app, BrowserWindow,Menu } = require('electron')
const shell = require('electron').shell
const ipcMain = require('electron').ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('src/index.html')

  var menu = Menu.buildFromTemplate([
    {
      label:'Menu',
      submenu:[
        {label:'Adjust notification value'},
        {
          label:'Coin Market Cap',
          click(){
            shell.openExternal("http://coinmarketcap.com")
          }
        },
        {type:'separator'},
        { 
          label:'Exit',
          click(){
            console.log("called quit")
            app.quit()
          }
        }
      ]
    },
    {
      label:'Info'
    }
  ])
  Menu.setApplicationMenu(menu)
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('update-notify-value',function(event,args){
  event.reply('targetPriceVal',args)
})

