'use strict';

const electron = require('electron');
const url = require('url');
const path = require('path');

require('electron-reload')(__dirname);

const {app, BrowserWindow} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({});
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'screen/daily/dailyWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.maximize();
});