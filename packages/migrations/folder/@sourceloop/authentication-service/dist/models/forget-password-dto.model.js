"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordDto = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/* eslint-disable  @typescript-eslint/naming-convention */
const repository_1 = require("@loopback/repository");
let ForgetPasswordDto = class ForgetPasswordDto extends repository_1.Model {
    // sonarignore:end
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
], ForgetPasswordDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ForgetPasswordDto.prototype, "client_id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ForgetPasswordDto.prototype, "client_secret", void 0);
ForgetPasswordDto = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ForgetPasswordDto);
exports.ForgetPasswordDto = ForgetPasswordDto;
//# sourceMappingURL=forget-password-dto.model.js.map