"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerProvider = void 0;
const logger_console_1 = require("../winston/logger-console");
class LoggerProvider {
    constructor() {
        this.logger = new logger_console_1.WinstonConsoleLogger();
    }
    // Provider interface
    value() {
        return this.logger;
    }
}
exports.LoggerProvider = LoggerProvider;
//# sourceMappingURL=logger.provider.js.map