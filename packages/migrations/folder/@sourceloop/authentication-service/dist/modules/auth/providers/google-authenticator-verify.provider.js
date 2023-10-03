"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthenticatorVerifyProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../../../repositories");
const core_1 = require("@sourceloop/core");
const otplib_1 = require("otplib");
let GoogleAuthenticatorVerifyProvider = class GoogleAuthenticatorVerifyProvider {
    constructor(userRepository, userCredsRepository, otpCacheRepo, logger) {
        this.userRepository = userRepository;
        this.userCredsRepository = userCredsRepository;
        this.otpCacheRepo = otpCacheRepo;
        this.logger = logger;
    }
    value() {
        return async (username, otp) => {
            const user = await this.userRepository.findOne({
                where: {
                    username: username,
                },
            });
            if (!user) {
                this.logger.error('Invalid Username');
                throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
            }
            const authenticatorSecret = await this.userCredsRepository.findOne({
                where: {
                    userId: user.id,
                },
                fields: {
                    secretKey: true,
                },
            });
            if (!(authenticatorSecret === null || authenticatorSecret === void 0 ? void 0 : authenticatorSecret.secretKey)) {
                throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
            }
            let isValid = false;
            try {
                isValid = otplib_1.authenticator
                    .create(otplib_1.authenticator.allOptions())
                    .verify({ token: otp, secret: authenticatorSecret.secretKey });
            }
            catch (err) {
                this.logger.error(err);
                throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
            }
            if (!isValid) {
                throw new rest_1.HttpErrors.Unauthorized("Otp Token Incorrect or Expired" /* AuthErrorKeys.OtpExpired */);
            }
            return user;
        };
    }
};
GoogleAuthenticatorVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserCredentialsRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.OtpCacheRepository)),
    tslib_1.__param(3, (0, context_1.inject)(core_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.UserCredentialsRepository,
        repositories_1.OtpCacheRepository, Object])
], GoogleAuthenticatorVerifyProvider);
exports.GoogleAuthenticatorVerifyProvider = GoogleAuthenticatorVerifyProvider;
//# sourceMappingURL=google-authenticator-verify.provider.js.map