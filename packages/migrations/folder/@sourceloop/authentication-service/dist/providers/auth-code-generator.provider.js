"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCodeGeneratorProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const keys_1 = require("./keys");
const services_1 = require("../services");
const keys_2 = require("../keys");
let AuthCodeGeneratorProvider = class AuthCodeGeneratorProvider {
    constructor(otpService, checkMfa, codeWriter, mfaConfig, otpConfig) {
        this.otpService = otpService;
        this.checkMfa = checkMfa;
        this.codeWriter = codeWriter;
        this.mfaConfig = mfaConfig;
        this.otpConfig = otpConfig;
    }
    value() {
        return async (client, user) => {
            const codePayload = {
                clientId: client.clientId,
                user: user,
            };
            const isMfaEnabled = await this.checkMfa(user);
            if (isMfaEnabled) {
                codePayload.mfa = true;
                if (this.mfaConfig.secondFactor === "otp" /* STRATEGY.OTP */ &&
                    this.otpConfig.method === "OTP" /* OtpMethodType.OTP */) {
                    await this.otpService.sendOtp(user, client);
                }
            }
            return this.codeWriter(jwt.sign(codePayload, client.secret, {
                expiresIn: client.authCodeExpiration,
                audience: client.clientId,
                issuer: process.env.JWT_ISSUER,
                algorithm: 'HS256',
            }));
        };
    }
};
AuthCodeGeneratorProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)('services.otpService')),
    tslib_1.__param(1, (0, context_1.inject)(keys_1.VerifyBindings.MFA_PROVIDER)),
    tslib_1.__param(2, (0, context_1.inject)(keys_1.AuthCodeBindings.CODEWRITER_PROVIDER)),
    tslib_1.__param(3, (0, context_1.inject)(keys_2.AuthServiceBindings.MfaConfig, { optional: true })),
    tslib_1.__param(4, (0, context_1.inject)(keys_2.AuthServiceBindings.OtpConfig, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [services_1.OtpService, Function, Function, Object, Object])
], AuthCodeGeneratorProvider);
exports.AuthCodeGeneratorProvider = AuthCodeGeneratorProvider;
//# sourceMappingURL=auth-code-generator.provider.js.map