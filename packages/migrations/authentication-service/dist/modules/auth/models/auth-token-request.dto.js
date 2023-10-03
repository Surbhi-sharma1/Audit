"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenRequest = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
let AuthTokenRequest = class AuthTokenRequest extends core_1.CoreModel {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], AuthTokenRequest.prototype, "code", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], AuthTokenRequest.prototype, "clientId", void 0);
AuthTokenRequest = tslib_1.__decorate([
    (0, repository_1.model)({
        description: 'This is the signature for requesting the accessToken and refreshToken.',
    })
], AuthTokenRequest);
exports.AuthTokenRequest = AuthTokenRequest;
//# sourceMappingURL=auth-token-request.dto.js.map