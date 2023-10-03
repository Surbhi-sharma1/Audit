"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordResponseDto = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
const user_model_1 = require("./user.model");
let ForgetPasswordResponseDto = class ForgetPasswordResponseDto extends core_1.CoreModel {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ForgetPasswordResponseDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ForgetPasswordResponseDto.prototype, "expiry", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ForgetPasswordResponseDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: user_model_1.User,
    }),
    tslib_1.__metadata("design:type", user_model_1.User)
], ForgetPasswordResponseDto.prototype, "user", void 0);
ForgetPasswordResponseDto = tslib_1.__decorate([
    (0, repository_1.model)()
], ForgetPasswordResponseDto);
exports.ForgetPasswordResponseDto = ForgetPasswordResponseDto;
//# sourceMappingURL=forget-password-response-dto.model.js.map