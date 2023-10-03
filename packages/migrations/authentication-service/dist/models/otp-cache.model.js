"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpCache = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
let OtpCache = class OtpCache extends core_1.CoreEntity {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OtpCache.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OtpCache.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OtpCache.prototype, "otpSecret", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OtpCache.prototype, "clientId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OtpCache.prototype, "clientSecret", void 0);
OtpCache = tslib_1.__decorate([
    (0, repository_1.model)()
], OtpCache);
exports.OtpCache = OtpCache;
//# sourceMappingURL=otp-cache.model.js.map