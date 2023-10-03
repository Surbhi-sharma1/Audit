"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupRequestResponseDto = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
let SignupRequestResponseDto = class SignupRequestResponseDto extends repository_1.Model {
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
], SignupRequestResponseDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], SignupRequestResponseDto.prototype, "expiry", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], SignupRequestResponseDto.prototype, "email", void 0);
SignupRequestResponseDto = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], SignupRequestResponseDto);
exports.SignupRequestResponseDto = SignupRequestResponseDto;
//# sourceMappingURL=signup-request-response-dto.model.js.map