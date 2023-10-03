"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupRequestDto = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
let SignupRequestDto = class SignupRequestDto extends repository_1.Model {
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
], SignupRequestDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
        required: false,
    }),
    tslib_1.__metadata("design:type", Object)
], SignupRequestDto.prototype, "data", void 0);
SignupRequestDto = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], SignupRequestDto);
exports.SignupRequestDto = SignupRequestDto;
//# sourceMappingURL=signup-request-dto.model.js.map