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
        title: "test-app",
        text: msg
    })
}

function startUpdater() {

    autoUpdater.logger = getLogger();

    autoUpdater.on("checking-for-update", () => {
        sendStatus("アプリの更新版を確認しています");
    })
    autoUpdater.on("update-available", (info) => {
        sendStatus("アプリの更新版をダウンロードしています");
    })
    autoUpdater.on("update-not-available", (info) => {
        sendStatus("最新のアプリを実行しています");
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
        sendStatus("アプリの更新版がダウンロードできました、再起動します");

        autoUpdater.quitAndInstall();
    });

    autoUpdater.checkForUpdatesAndNotify();
}

module.exports = {
    startUpdater: startUpdater
}