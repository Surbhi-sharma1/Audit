"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonConsoleLogger = void 0;
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const winston_1 = require("winston");
const keys_1 = require("../keys");
const logger_base_1 = require("./logger-base");
class WinstonConsoleLogger extends logger_base_1.WinstonLoggerBase {
    constructor() {
        var _a;
        super();
        const logFormat = winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.timestamp(), winston_1.format.printf((log) => `[${log.timestamp}] ${log.level} :: ${log.message}`));
        this.logger = (0, winston_1.createLogger)({
            transports: [new winston_1.transports.Console()],
            format: logFormat,
            level: (_a = process.env.LOG_LEVEL) !== null && _a !== void 0 ? _a : keys_1.LOGGER.LOG_LEVEL[keys_1.LOGGER.LOG_LEVEL.ERROR].toLowerCase(),
        });
    }
}
exports.WinstonConsoleLogger = WinstonConsoleLogger;
//# sourceMappingURL=logger-console.js.map