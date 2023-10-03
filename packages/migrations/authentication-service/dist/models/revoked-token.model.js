"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevokedToken = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
let RevokedToken = class RevokedToken extends core_1.CoreEntity {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], RevokedToken.prototype, "token", void 0);
RevokedToken = tslib_1.__decorate([
    (0, repository_1.model)()
], RevokedToken);
exports.RevokedToken = RevokedToken;
//# sourceMappingURL=revoked-token.model.js.map