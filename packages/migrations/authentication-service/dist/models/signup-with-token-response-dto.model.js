"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupWithTokenReponseDto = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
let SignupWithTokenReponseDto = class SignupWithTokenReponseDto extends core_1.CoreModel {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], SignupWithTokenReponseDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], SignupWithTokenReponseDto.prototype, "user", void 0);
SignupWithTokenReponseDto = tslib_1.__decorate([
    (0, repository_1.model)()
], SignupWithTokenReponseDto);
exports.SignupWithTokenReponseDto = SignupWithTokenReponseDto;
//# sourceMappingURL=signup-with-token-response-dto.model.js.map