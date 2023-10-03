"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpLoginRequest = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
let OtpLoginRequest = class OtpLoginRequest extends core_1.CoreModel {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: "This property is supposed to be a string and is a required field" /* ModelPropertyDescriptionString.reqStrPropDesc */,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], OtpLoginRequest.prototype, "key", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: "This property is supposed to be a string and is a required field" /* ModelPropertyDescriptionString.reqStrPropDesc */,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], OtpLoginRequest.prototype, "otp", void 0);
OtpLoginRequest = tslib_1.__decorate([
    (0, repository_1.model)({
        description: 'This is the signature for OTP login request.',
    })
], OtpLoginRequest);
exports.OtpLoginRequest = OtpLoginRequest;
//# sourceMappingURL=otp-login-request.dto.js.map