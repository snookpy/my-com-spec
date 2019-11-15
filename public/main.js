const { app, ipcMain, BrowserWindow }  = require("electron") 

const path = require('path');
const isDev = require('electron-is-dev');
const url = require('url')
const si = require('systeminformation');

let mainWindow;

function createWindow() {
  const startUrl = isDev ? 'http://localhost:5555' : url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  mainWindow = new BrowserWindow({width: 900, height: 680,
    webPreferences: {
      nodeIntegration: true,
      // webSecurity: false,
      preload: path.join(__dirname, 'preload.js')
    }});
    
    mainWindow.loadURL(startUrl);
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


