"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
let Otp = class Otp extends core_1.CoreEntity {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Otp.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Otp.prototype, "username", void 0);
Otp = tslib_1.__decorate([
    (0, repository_1.model)()
], Otp);
exports.Otp = Otp;
//# sourceMappingURL=otp.model.js.map