"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupRequest = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
let SignupRequest = class SignupRequest extends repository_1.Model {
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
], SignupRequest.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        require: true,
    }),
    tslib_1.__metadata("design:type", String)
], SignupRequest.prototype, "expiry", void 0);
SignupRequest = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], SignupRequest);
exports.SignupRequest = SignupRequest;
//# sourceMappingURL=signup-request.model.js.map