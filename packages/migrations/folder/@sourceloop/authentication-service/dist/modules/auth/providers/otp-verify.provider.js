"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpVerifyProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const loopback4_authentication_1 = require("loopback4-authentication");
const repositories_1 = require("../../../repositories");
const core_1 = require("@sourceloop/core");
const otplib_1 = require("otplib");
const services_1 = require("../../../services");
const models_1 = require("../../../models");
let OtpVerifyProvider = class OtpVerifyProvider {
    constructor(userRepository, otpCacheRepo, logger, client, otpService) {
        this.userRepository = userRepository;
        this.otpCacheRepo = otpCacheRepo;
        this.logger = logger;
        this.client = client;
        this.otpService = otpService;
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
            //sender
            if (!otp) {
                await this.otpService.sendOtp(user, this.client);
                return user;
            }
            //verifier
            const otpCache = await this.otpCacheRepo.get(username);
            if (!otpCache) {
                this.logger.error('Invalid Username');
                throw new rest_1.HttpErrors.Unauthorized("Otp Token Incorrect or Expired" /* AuthErrorKeys.OtpExpired */);
            }
            let isValid = false;
            try {
                if (otpCache.otpSecret)
                    isValid = otplib_1.totp.check(otp, otpCache.otpSecret);
            }
            catch (err) {
                this.logger.error(err);
                throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
            }
            if (!isValid) {
                throw new rest_1.HttpErrors.Unauthorized("Otp Invalid" /* AuthErrorKeys.OtpInvalid */);
            }
            return user;
        };
    }
};
OtpVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.OtpCacheRepository)),
    tslib_1.__param(2, (0, context_1.inject)(core_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(3, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_CLIENT)),
    tslib_1.__param(4, (0, context_1.inject)('services.otpService')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.OtpCacheRepository, Object, models_1.AuthClient,
        services_1.OtpService])
], OtpVerifyProvider);
exports.OtpVerifyProvider = OtpVerifyProvider;
//# sourceMappingURL=otp-verify.provider.js.map