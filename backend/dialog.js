const {
    BrowserWindow,
    dialog
} = require("electron");

function showMsg(message) {

    let options = {
        title: "",
        type: "info",
        buttons: ["OK"],
        message: "",
        detail: message
    };

    dialog.showMessageBox(BrowserWindow.getFocusedWindow(), options);
}

module.exports = {
    showMsg: showMsg
};
