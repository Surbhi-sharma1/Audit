"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacadesBearerTokenVerifyProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const jsonwebtoken_1 = require("jsonwebtoken");
const loopback4_authentication_1 = require("loopback4-authentication");
const moment_1 = tslib_1.__importDefault(require("moment"));
const logger_extension_1 = require("../../logger-extension");
const repositories_1 = require("../repositories");
let FacadesBearerTokenVerifyProvider = class FacadesBearerTokenVerifyProvider {
    constructor(revokedTokenRepository, logger, authUserModel) {
        this.revokedTokenRepository = revokedTokenRepository;
        this.logger = logger;
        this.authUserModel = authUserModel;
    }
    value() {
        return async (token, req) => {
            try {
                const isRevoked = await this.revokedTokenRepository.get(token);
                if (isRevoked === null || isRevoked === void 0 ? void 0 : isRevoked.token) {
                    throw new rest_1.HttpErrors.Unauthorized('TokenRevoked');
                }
            }
            catch (error) {
                if (rest_1.HttpErrors.HttpError.prototype.isPrototypeOf(error)) {
                    throw error;
                }
                this.logger.error('Revoked token repository not available !');
            }
            let user;
            try {
                user = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, {
                    issuer: process.env.JWT_ISSUER,
                    algorithms: ['HS256'],
                });
            }
            catch (error) {
                this.logger.error(JSON.stringify(error));
                throw new rest_1.HttpErrors.Unauthorized('TokenExpired');
            }
            if (user.passwordExpiryTime &&
                (0, moment_1.default)().isSameOrAfter((0, moment_1.default)(user.passwordExpiryTime))) {
                throw new rest_1.HttpErrors.Unauthorized('PasswordExpiryError');
            }
            if (this.authUserModel) {
                return new this.authUserModel(user);
            }
            else {
                return user;
            }
        };
    }
};
FacadesBearerTokenVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.RevokedTokenRepository)),
    tslib_1.__param(1, (0, context_1.inject)(logger_extension_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(2, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.USER_MODEL, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RevokedTokenRepository, Object, Object])
], FacadesBearerTokenVerifyProvider);
exports.FacadesBearerTokenVerifyProvider = FacadesBearerTokenVerifyProvider;
//# sourceMappingURL=facades-bearer-token-verify.provider.js.map