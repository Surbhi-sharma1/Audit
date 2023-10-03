"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpsertResponse = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
let UpsertResponse = class UpsertResponse extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], UpsertResponse.prototype, "created", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], UpsertResponse.prototype, "updated", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], UpsertResponse.prototype, "failed", void 0);
UpsertResponse = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], UpsertResponse);
exports.UpsertResponse = UpsertResponse;
//# sourceMappingURL=upsert-response.dto.js.map