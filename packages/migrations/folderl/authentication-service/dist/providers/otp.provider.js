"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const providers_1 = require("../providers");
const otplib_1 = require("otplib");
let OtpProvider = class OtpProvider {
    constructor(generateOtp, sendOtp) {
        this.generateOtp = generateOtp;
        this.sendOtp = sendOtp;
    }
    value() {
        return async (user) => {
            const secret = otplib_1.authenticator.generateSecret();
            const otp = await this.generateOtp(secret);
            await this.sendOtp(otp, user);
            return {
                key: secret,
            };
        };
    }
};
OtpProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(providers_1.VerifyBindings.OTP_GENERATE_PROVIDER)),
    tslib_1.__param(1, (0, context_1.inject)(providers_1.VerifyBindings.OTP_SENDER_PROVIDER)),
    tslib_1.__metadata("design:paramtypes", [Function, Function])
], OtpProvider);
exports.OtpProvider = OtpProvider;
//# sourceMappingURL=otp.provider.js.map