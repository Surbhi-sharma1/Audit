"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerExtensionComponent = void 0;
const keys_1 = require("./keys");
const logger_provider_1 = require("./providers/logger.provider");
class LoggerExtensionComponent {
    constructor() {
        this.providers = {};
        this.providers = { [keys_1.LOGGER.BINDINGS.LOG_ACTION.key]: logger_provider_1.LoggerProvider };
    }
}
exports.LoggerExtensionComponent = LoggerExtensionComponent;
//# sourceMappingURL=component.js.map