"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRefreshTokenRequest = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
let AuthRefreshTokenRequest = class AuthRefreshTokenRequest extends core_1.CoreModel {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], AuthRefreshTokenRequest.prototype, "refreshToken", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], AuthRefreshTokenRequest.prototype, "tenantId", void 0);
AuthRefreshTokenRequest = tslib_1.__decorate([
    (0, repository_1.model)()
], AuthRefreshTokenRequest);
exports.AuthRefreshTokenRequest = AuthRefreshTokenRequest;
//# sourceMappingURL=auth-refresh-token-request.dto.js.map