// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const {autoUpdater} = require("electron-updater")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createWindow()
  autoUpdater.logger = require("electron-log")
  autoUpdater.logger.transports.file.level = "info"
  autoUpdater.checkForUpdates()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
    // autoUpdater.checkForUpdates()
  }
})

// when the update has been downloaded and is ready to be installed, notify the BrowserWindow
autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContents.send('updateReady')
});

autoUpdater.on('checking-for-update', () => {
  mainWindow.webContents.send('updateInfo', 'Checking for updates..')
})
autoUpdater.on('update-available', (ev, info) => {
  mainWindow.webContents.send('updateInfo', 'Update available')
})
autoUpdater.on('update-not-available', (ev, info) => {
  mainWindow.webContents.send('updateInfo', 'Update not available')
})
autoUpdater.on('error', (ev, err) => {
  mainWindow.webContents.send('updateInfo', err)
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  mainWindow.webContents.send('updateInfo', 'Downloading update')
})

// when receiving a quitAndInstall signal, quit and install the new version ;)
ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})
