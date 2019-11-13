const electron = require("electron") 
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron');

var os = require("os");
const si = require('systeminformation');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680,
    webPreferences: {
      nodeIntegration: true
    }});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('get-cpu', async (event, arg) => {
  const data = await si.cpu();

  console.log("os.cpus os.cpus os.cpus", data)
  
  event.reply('get-cpu', JSON.stringify( data))
})

ipcMain.on('get-mem', async (event, arg) => {
  const mem = await si.mem();
  console.log("memory ", mem)
  // should 1048576
  event.reply('get-mem', JSON.stringify(mem))
})

ipcMain.on('get-mem-layout', async (event, arg) => {
  const memLayout = await si.memLayout()
  console.log("memLayout ", memLayout)

  // should divine by 1048576
  event.reply('get-mem-layout', JSON.stringify(memLayout))
})

ipcMain.on('get-disk', async (event, arg) => {

  const disk = await si.diskLayout()
  console.log("disk ", disk)

  // should 1048576
  event.reply('get-disk', JSON.stringify(disk))
})


