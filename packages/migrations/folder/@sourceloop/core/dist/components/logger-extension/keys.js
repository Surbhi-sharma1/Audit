"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGGER = void 0;
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const constants_1 = require("../../constants");
var LOGGER;
(function (LOGGER) {
    /**
     * Injection key constant
     */
    LOGGER.LOGGER_INJECT = `${constants_1.BINDING_PREFIX}.log.action`;
    /**
     * Binding keys used by this component.
     */
    let BINDINGS;
    (function (BINDINGS) {
        BINDINGS.LOG_ACTION = context_1.BindingKey.create(LOGGER.LOGGER_INJECT);
    })(BINDINGS = LOGGER.BINDINGS || (LOGGER.BINDINGS = {}));
    /**
     * Enum to define the supported log levels
     */
    /* eslint-disable-next-line  @typescript-eslint/naming-convention */
    let LOG_LEVEL;
    (function (LOG_LEVEL) {
        LOG_LEVEL[LOG_LEVEL["DEBUG"] = 0] = "DEBUG";
        LOG_LEVEL[LOG_LEVEL["INFO"] = 1] = "INFO";
        LOG_LEVEL[LOG_LEVEL["WARN"] = 2] = "WARN";
        LOG_LEVEL[LOG_LEVEL["ERROR"] = 3] = "ERROR";
        LOG_LEVEL[LOG_LEVEL["OFF"] = 4] = "OFF";
    })(LOG_LEVEL = LOGGER.LOG_LEVEL || (LOGGER.LOG_LEVEL = {}));
})(LOGGER = exports.LOGGER || (exports.LOGGER = {}));
//# sourceMappingURL=keys.js.map