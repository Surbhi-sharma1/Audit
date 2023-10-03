"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredentials = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
const user_model_1 = require("./user.model");
let UserCredentials = class UserCredentials extends core_1.UserModifiableEntity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserCredentials.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_model_1.User, { keyFrom: 'user_id', name: 'user' }, {
        name: 'user_id',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserCredentials.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        name: 'auth_provider',
    }),
    tslib_1.__metadata("design:type", String)
], UserCredentials.prototype, "authProvider", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'auth_id',
    }),
    tslib_1.__metadata("design:type", String)
], UserCredentials.prototype, "authId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'auth_token',
    }),
    tslib_1.__metadata("design:type", String)
], UserCredentials.prototype, "authToken", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'secret_key',
        description: 'Secret for Authenticator app',
    }),
    tslib_1.__metadata("design:type", String)
], UserCredentials.prototype, "secretKey", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserCredentials.prototype, "password", void 0);
UserCredentials = tslib_1.__decorate([
    (0, repository_1.model)({
        name: 'user_credentials',
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserCredentials);
exports.UserCredentials = UserCredentials;
//# sourceMappingURL=user-credentials.model.js.map