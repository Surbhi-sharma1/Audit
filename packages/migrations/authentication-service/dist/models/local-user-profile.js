"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalUserProfileDto = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
let LocalUserProfileDto = class LocalUserProfileDto extends core_1.CoreModel {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], LocalUserProfileDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], LocalUserProfileDto.prototype, "password", void 0);
LocalUserProfileDto = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            strict: false,
        },
    })
], LocalUserProfileDto);
exports.LocalUserProfileDto = LocalUserProfileDto;
//# sourceMappingURL=local-user-profile.js.map