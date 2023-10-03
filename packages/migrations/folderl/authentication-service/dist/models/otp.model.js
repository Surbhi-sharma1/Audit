"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
let Otp = class Otp extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
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
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Otp);
exports.Otp = Otp;
//# sourceMappingURL=otp.model.js.map