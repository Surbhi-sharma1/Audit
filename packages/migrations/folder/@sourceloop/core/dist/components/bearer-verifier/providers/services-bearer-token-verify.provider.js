"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesBearerTokenVerifyProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const jsonwebtoken_1 = require("jsonwebtoken");
const loopback4_authentication_1 = require("loopback4-authentication");
const moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
const logger_extension_1 = require("../../logger-extension");
let ServicesBearerTokenVerifyProvider = class ServicesBearerTokenVerifyProvider {
    constructor(logger, authUserModel) {
        this.logger = logger;
        this.authUserModel = authUserModel;
    }
    value() {
        return async (token) => {
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
                (0, moment_timezone_1.default)().isSameOrAfter((0, moment_timezone_1.default)(user.passwordExpiryTime))) {
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
ServicesBearerTokenVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(logger_extension_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(1, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.USER_MODEL, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], ServicesBearerTokenVerifyProvider);
exports.ServicesBearerTokenVerifyProvider = ServicesBearerTokenVerifyProvider;
//# sourceMappingURL=services-bearer-token-verify.provider.js.map