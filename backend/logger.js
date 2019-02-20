const logger = require("electron-log");

logger.transports.file.level = "info";
logger.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s}:{ms} {text}';

function logInfo(msg) {
    logger.info(msg)
}

function logError(msg) {
    logger.error(msg)
}

module.exports = {
    logInfo: logInfo,
    logError: logError
};
