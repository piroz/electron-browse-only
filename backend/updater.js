const {
    autoUpdater
} = require("electron-updater");

const { getLogger } = require("./logger");

function sendStatus(msg) {
    let notify = require("electron-notify");

    notify.setConfig({
        displayTime: 3000
    });

    notify.notify({
        title: "fess-desktop",
        text: msg
    })
}

function startUpdater() {

    autoUpdater.logger = getLogger();
    autoUpdater.autoInstallOnAppQuit = true;

    autoUpdater.on("checking-for-update", () => {
        sendStatus("アプリの更新版を確認中");
    })
    autoUpdater.on("update-available", (info) => {
        sendStatus("アプリの更新版がダウンロードできます");
    })
    autoUpdater.on("update-not-available", (info) => {
        sendStatus("アプリは最新です");
    })
    autoUpdater.on("error", (err) => {
        sendStatus("Error in auto-updater. " + err);
    })
    /*autoUpdater.on("download-progress", (progressObj) => {
        let log_message = "Download speed: " + progressObj.bytesPerSecond;
        log_message = log_message + " - Downloaded " + progressObj.percent + "%";
        log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
        sendStatus(log_message);
    })*/
    autoUpdater.on("update-downloaded", (info) => {
        sendStatus("アプリの更新版がダウンロードできました、次回起動時に更新されます。");
    });

    autoUpdater.checkForUpdatesAndNotify();
}

module.exports = {
    startUpdater: startUpdater
}