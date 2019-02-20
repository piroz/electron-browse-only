const {
    app,
    BrowserWindow,
    globalShortcut,
    ipcMain
} = require("electron");
const fs = require("fs-extra");
const path = require("path");
const osDownloads = require("os-downloads");
const {
    download
} = require("electron-dl");
const opn = require("opn");
const windowStateKeeper = require("electron-window-state");
const {
    createMenu
} = require("./menu");
const {
    logInfo
} = require("./logger");
const { startUpdater } = require("./updater");

let win;

function loadStartPage() {

    let pageurl = require("../app.json").startpage;

    logInfo("loadStartPage");

    win.loadURL(pageurl);
}

function createWindow() {

    logInfo("createWindow");

    const state = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800
    });

    win = new BrowserWindow({
        title: "open",
        x: state.x,
        y: state.y,
        width: state.width,
        height: state.height,
        webPreferences: {
            nodeIntegration: false,
            //contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    state.manage(win);

    createMenu();

    win.focus();

    loadStartPage();

    win.on("closed", () => {
        win = null;
    });

    startUpdater();
}

function start() {

    // force enable touch-events
    app.commandLine.appendSwitch("touch-events", "enabled");

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("activate", () => {
        if (win === null) {
            createWindow();
        }
    });

    app.on("will-quit", () => {
        globalShortcut.unregisterAll();
    });

    app.on("ready", () => {
        createWindow();
    });

    ipcMain.on("log", function (ev, msg) {
        logInfo(msg);
    });

    ipcMain.on("dl", function (ev, url) {

        let previouslyDownloaded = path.join(osDownloads(), path.basename(url));

        fs.stat(previouslyDownloaded)
            .then(stats => {
                opn(previouslyDownloaded);
            })
            .catch(err => {
                downloadAndOpen(url);
            });
    });
}

function onProgress(progress) {
    win.webContents.executeJavaScript(`updateProgress(${progress})`);
}

function downloadAndOpen(url) {
    download(win, url, {
            onProgress: onProgress
        })
        .then(dl => {
            opn(dl.getSavePath());
        })
        .catch(err => {
            logInfo("Download failed", err.message);
        });
}

module.exports = {
    start: start
};
