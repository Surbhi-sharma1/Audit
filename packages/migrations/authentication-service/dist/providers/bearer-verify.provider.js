"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupBearerVerifyProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const core_1 = require("@sourceloop/core");
const jsonwebtoken_1 = require("jsonwebtoken");
let SignupBearerVerifyProvider = class SignupBearerVerifyProvider {
    constructor(logger) {
        this.logger = logger;
    }
    value() {
        return async (token, req) => {
            let result;
            try {
                result = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, {
                    issuer: process.env.JWT_ISSUER,
                    algorithms: ['HS256'],
                });
            }
            catch (error) {
                this.logger.error(JSON.stringify(error));
                throw new rest_1.HttpErrors.Unauthorized('TokenExpired');
            }
            return result;
        };
    }
};
SignupBearerVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(core_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__metadata("design:paramtypes", [Object])
], SignupBearerVerifyProvider);
exports.SignupBearerVerifyProvider = SignupBearerVerifyProvider;
//# sourceMappingURL=bearer-verify.provider.js.map