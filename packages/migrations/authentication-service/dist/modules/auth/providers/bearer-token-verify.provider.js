"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearerTokenVerifyProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_1 = require("@sourceloop/core");
const moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
const providers_1 = require("../../../providers");
const repositories_1 = require("../../../repositories");
let BearerTokenVerifyProvider = class BearerTokenVerifyProvider {
    constructor(revokedTokenRepository, logger, jwtVerifier) {
        this.revokedTokenRepository = revokedTokenRepository;
        this.logger = logger;
        this.jwtVerifier = jwtVerifier;
    }
    value() {
        return async (token, req) => {
            const isRevoked = await this.revokedTokenRepository.get(token);
            if (isRevoked === null || isRevoked === void 0 ? void 0 : isRevoked.token) {
                throw new rest_1.HttpErrors.Unauthorized("TokenRevoked" /* AuthenticateErrorKeys.TokenRevoked */);
            }
            let user;
            try {
                user = await this.jwtVerifier(token, {
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
                throw new rest_1.HttpErrors.Unauthorized("PasswordExpiryError" /* AuthenticateErrorKeys.PasswordExpiryError */);
            }
            return user;
        };
    }
};
BearerTokenVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.RevokedTokenRepository)),
    tslib_1.__param(1, (0, context_1.inject)(core_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(2, (0, context_1.inject)(providers_1.AuthCodeBindings.JWT_VERIFIER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RevokedTokenRepository, Object, Function])
], BearerTokenVerifyProvider);
exports.BearerTokenVerifyProvider = BearerTokenVerifyProvider;
//# sourceMappingURL=bearer-token-verify.provider.js.map