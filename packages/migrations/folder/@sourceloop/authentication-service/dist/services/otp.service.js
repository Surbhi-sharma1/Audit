"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_2 = require("@sourceloop/core");
const providers_1 = require("../providers");
const repositories_1 = require("../repositories");
let OtpService = class OtpService {
    constructor(otpCacheRepo, userRepository, logger, otpSender) {
        this.otpCacheRepo = otpCacheRepo;
        this.userRepository = userRepository;
        this.logger = logger;
        this.otpSender = otpSender;
    }
    async sendOtp(user, client) {
        if (!client) {
            this.logger.error('Auth client not found or invalid');
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
        }
        if (!user) {
            this.logger.error('Auth user not found or invalid');
            throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        const res = await this.otpSender(user);
        await this.otpCacheRepo.delete(user.username);
        await this.otpCacheRepo.set(user.username, {
            otpSecret: res.key,
            clientId: client.clientId,
            clientSecret: client.secret,
        });
    }
};
OtpService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.OtpCacheRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(2, (0, context_1.inject)(core_2.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(3, (0, context_1.inject)(providers_1.VerifyBindings.OTP_PROVIDER, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [repositories_1.OtpCacheRepository,
        repositories_1.UserRepository, Object, Function])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map