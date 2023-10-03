"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const models_1 = require("../../../models");
let ResetPassword = class ResetPassword extends models_1.RefreshTokenRequest {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: "This property is supposed to be a string and is a required field" /* ModelPropertyDescriptionString.reqStrPropDesc */,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ResetPassword.prototype, "username", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: "This property is supposed to be a string and is a required field" /* ModelPropertyDescriptionString.reqStrPropDesc */,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ResetPassword.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: "This property is supposed to be a string and is a required field" /* ModelPropertyDescriptionString.reqStrPropDesc */,
    }),
    tslib_1.__metadata("design:type", String)
], ResetPassword.prototype, "oldPassword", void 0);
ResetPassword = tslib_1.__decorate([
    (0, repository_1.model)({
        description: `This is a signature for reset password.`,
    })
], ResetPassword);
exports.ResetPassword = ResetPassword;
//# sourceMappingURL=reset-password.dto.js.map