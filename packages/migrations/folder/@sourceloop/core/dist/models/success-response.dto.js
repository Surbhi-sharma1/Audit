"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
let SuccessResponse = class SuccessResponse extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], SuccessResponse.prototype, "success", void 0);
SuccessResponse = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], SuccessResponse);
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=success-response.dto.js.map