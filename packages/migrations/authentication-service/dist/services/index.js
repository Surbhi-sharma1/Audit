"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const login_helper_service_1 = require("./login-helper.service");
const otp_service_1 = require("./otp.service");
tslib_1.__exportStar(require("./login-helper.service"), exports);
tslib_1.__exportStar(require("./otp.service"), exports);
exports.services = [login_helper_service_1.LoginHelperService, otp_service_1.OtpService];
//# sourceMappingURL=index.js.map