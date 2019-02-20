const {
    Menu
} = require("electron");

const {
    showMsg
} = require("./dialog");
const config = require("../package.json");

function createMenu() {
    const template = [{
            label: "Edit",
            submenu: [{
                    role: "undo"
                },
                {
                    role: "redo"
                },
                {
                    type: "separator"
                },
                {
                    role: "cut"
                },
                {
                    role: "copy"
                },
                {
                    role: "paste"
                },
                {
                    role: "pasteandmatchstyle"
                },
                {
                    role: "delete"
                },
                {
                    role: "selectall"
                }
            ]
        },
        {
            label: "View",
            submenu: [{
                    role: "reload"
                },
                {
                    role: "forcereload"
                },
                {
                    role: "toggledevtools"
                },
                {
                    type: "separator"
                },
                {
                    role: "resetzoom"
                },
                {
                    role: "zoomin"
                },
                {
                    role: "zoomout"
                },
                {
                    type: "separator"
                },
                {
                    role: "togglefullscreen"
                }
            ]
        },
        {
            role: "window",
            submenu: [{
                    role: "minimize"
                },
                {
                    role: "close"
                }
            ]
        },
        {
            role: "help",
            submenu: [{
                label: "version",
                click() {
                    showMsg("version:" + config.version);
                }
            }]
        }
    ];

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
}

module.exports = {
    createMenu: createMenu
};