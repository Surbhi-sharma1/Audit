"use strict";
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/* eslint-disable @typescript-eslint/naming-convention */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAuthRequest = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ClientAuthRequest = class ClientAuthRequest extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: "This property is supposed to be a string and is a required field" /* ModelPropertyDescriptionString.reqStrPropDesc */,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ClientAuthRequest.prototype, "client_id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: "This property is supposed to be a string and is a required field" /* ModelPropertyDescriptionString.reqStrPropDesc */,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ClientAuthRequest.prototype, "client_secret", void 0);
ClientAuthRequest = tslib_1.__decorate([
    (0, repository_1.model)({
        description: 'This is signature for client authentication request.',
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClientAuthRequest);
exports.ClientAuthRequest = ClientAuthRequest;
//# sourceMappingURL=client-auth-request.dto.js.map