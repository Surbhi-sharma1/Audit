"use strict";
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/* eslint-disable  @typescript-eslint/naming-convention */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordWithClient = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
let ResetPasswordWithClient = class ResetPasswordWithClient extends core_1.CoreModel {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ResetPasswordWithClient.prototype, "token", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ResetPasswordWithClient.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ResetPasswordWithClient.prototype, "client_id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ResetPasswordWithClient.prototype, "client_secret", void 0);
ResetPasswordWithClient = tslib_1.__decorate([
    (0, repository_1.model)()
], ResetPasswordWithClient);
exports.ResetPasswordWithClient = ResetPasswordWithClient;
//# sourceMappingURL=reset-password-with-client.model.js.map