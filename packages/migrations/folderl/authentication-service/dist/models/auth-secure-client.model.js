"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSecureClient = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const loopback4_authentication_1 = require("loopback4-authentication");
const auth_client_model_1 = require("./auth-client.model");
let AuthSecureClient = class AuthSecureClient extends auth_client_model_1.AuthClient {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'client_type',
    }),
    tslib_1.__metadata("design:type", String)
], AuthSecureClient.prototype, "clientType", void 0);
AuthSecureClient = tslib_1.__decorate([
    (0, repository_1.model)({
        name: 'auth_clients',
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AuthSecureClient);
exports.AuthSecureClient = AuthSecureClient;
//# sourceMappingURL=auth-secure-client.model.js.map