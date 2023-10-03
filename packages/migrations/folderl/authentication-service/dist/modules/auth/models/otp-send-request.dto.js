"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpSendRequest = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
let OtpSendRequest = class OtpSendRequest extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: "This property is supposed to be a string and is a required field" /* ModelPropertyDescriptionString.reqStrPropDesc */,
        required: true,
    })
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ,
    tslib_1.__metadata("design:type", String)
], OtpSendRequest.prototype, "client_id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: "This property is supposed to be a string and is a required field" /* ModelPropertyDescriptionString.reqStrPropDesc */,
        required: true,
    })
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ,
    tslib_1.__metadata("design:type", String)
], OtpSendRequest.prototype, "client_secret", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: "This property is supposed to be a string and is a required field" /* ModelPropertyDescriptionString.reqStrPropDesc */,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], OtpSendRequest.prototype, "key", void 0);
OtpSendRequest = tslib_1.__decorate([
    (0, repository_1.model)({
        description: 'This is the signature for OTP login request.',
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], OtpSendRequest);
exports.OtpSendRequest = OtpSendRequest;
//# sourceMappingURL=otp-send-request.dto.js.map