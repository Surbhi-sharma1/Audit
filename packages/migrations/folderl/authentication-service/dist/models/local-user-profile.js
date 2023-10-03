"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalUserProfileDto = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
let LocalUserProfileDto = class LocalUserProfileDto extends repository_1.Model {
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
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], LocalUserProfileDto);
exports.LocalUserProfileDto = LocalUserProfileDto;
//# sourceMappingURL=local-user-profile.js.map