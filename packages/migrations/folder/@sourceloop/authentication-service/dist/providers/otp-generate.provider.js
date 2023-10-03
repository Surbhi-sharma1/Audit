"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpGenerateProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const core_1 = require("@sourceloop/core");
const rest_1 = require("@loopback/rest");
const otplib_1 = require("otplib");
const otpStep = 300;
const otpWindow = 0;
let OtpGenerateProvider = class OtpGenerateProvider {
    constructor(logger) {
        this.logger = logger;
    }
    value() {
        return async (secret) => {
            var _a, _b;
            if (!secret) {
                this.logger.error('Invalid OTP secret');
                throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
            }
            otplib_1.totp.options = {
                step: +((_a = process.env.OTP_STEP) !== null && _a !== void 0 ? _a : otpStep),
                window: +((_b = process.env.OTP_WINDOW) !== null && _b !== void 0 ? _b : otpWindow),
            };
            return otplib_1.totp.generate(secret);
        };
    }
};
OtpGenerateProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(core_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__metadata("design:paramtypes", [Object])
], OtpGenerateProvider);
exports.OtpGenerateProvider = OtpGenerateProvider;
//# sourceMappingURL=otp-generate.provider.js.map