"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLoggerBase = void 0;
const keys_1 = require("../keys");
class WinstonLoggerBase {
    log(info) {
        switch (Number(info.level)) {
            case keys_1.LOGGER.LOG_LEVEL.INFO:
                this.info(info.message, info.key);
                break;
            case keys_1.LOGGER.LOG_LEVEL.WARN:
                this.warn(info.message, info.key);
                break;
            case keys_1.LOGGER.LOG_LEVEL.ERROR:
                this.error(info.message, info.key);
                break;
            case keys_1.LOGGER.LOG_LEVEL.DEBUG:
                this.debug(info.message, info.key);
                break;
        }
    }
    info(message, key = 'App_Log') {
        this.logger.info(`${key} -> ${message}`);
    }
    warn(message, key = 'App_Log') {
        this.logger.warn(`${key} -> ${message}`);
    }
    error(message, key = 'App_Log') {
        this.logger.error(`${key} -> ${message}`);
    }
    debug(message, key = 'App_Log') {
        this.logger.debug(`${key} -> ${message}`);
    }
}
exports.WinstonLoggerBase = WinstonLoggerBase;
//# sourceMappingURL=logger-base.js.map