"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRequest = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
let RefreshTokenRequest = class RefreshTokenRequest extends repository_1.Model {
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
], RefreshTokenRequest.prototype, "refreshToken", void 0);
RefreshTokenRequest = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], RefreshTokenRequest);
exports.RefreshTokenRequest = RefreshTokenRequest;
//# sourceMappingURL=refresh-token-request.model.js.map