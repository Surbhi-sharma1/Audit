"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesBearerAsymmetricTokenVerifyProvider = void 0;
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
const fs = tslib_1.__importStar(require("fs/promises"));
const logger_extension_1 = require("../../logger-extension");
let ServicesBearerAsymmetricTokenVerifyProvider = class ServicesBearerAsymmetricTokenVerifyProvider {
    constructor(logger, authUserModel) {
        this.logger = logger;
        this.authUserModel = authUserModel;
    }
    value() {
        return async (token) => {
            var _a;
            let user;
            try {
                const publicKey = await fs.readFile((_a = process.env.JWT_PUBLIC_KEY) !== null && _a !== void 0 ? _a : '');
                user = (0, jsonwebtoken_1.verify)(token, publicKey, {
                    issuer: process.env.JWT_ISSUER,
                    algorithms: ['RS256'],
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
ServicesBearerAsymmetricTokenVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(logger_extension_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(1, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.USER_MODEL, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], ServicesBearerAsymmetricTokenVerifyProvider);
exports.ServicesBearerAsymmetricTokenVerifyProvider = ServicesBearerAsymmetricTokenVerifyProvider;
//# sourceMappingURL=services-bearer-asym-token-verifier.js.map