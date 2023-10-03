"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = exports.DeviceInfo = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const models_1 = require("../../../models");
class DeviceInfo {
}
exports.DeviceInfo = DeviceInfo;
let AuthUser = class AuthUser extends models_1.User {
    getIdentifier() {
        return this.id;
    }
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], AuthUser.prototype, "permissions", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], AuthUser.prototype, "role", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], AuthUser.prototype, "externalAuthToken", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
        description: `This property consists of two optional fields.
    1. userAgent
    2. deviceId `,
    }),
    tslib_1.__metadata("design:type", DeviceInfo)
], AuthUser.prototype, "deviceInfo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], AuthUser.prototype, "age", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], AuthUser.prototype, "externalRefreshToken", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], AuthUser.prototype, "authClientId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], AuthUser.prototype, "userPreferences", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], AuthUser.prototype, "tenantId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], AuthUser.prototype, "userTenantId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], AuthUser.prototype, "passwordExpiryTime", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        jsonSchema: {
            enum: [
                1 /* UserStatus.ACTIVE */,
                2 /* UserStatus.INACTIVE */,
                3 /* UserStatus.PASSWORD_CHANGE_NEEDED */,
                0 /* UserStatus.REGISTERED */,
                4 /* UserStatus.REJECTED */,
            ],
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AuthUser.prototype, "status", void 0);
AuthUser = tslib_1.__decorate([
    (0, repository_1.model)({
        description: `This is the signature for authenticated user which holds permissions and role.`,
        settings: { strict: true },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AuthUser);
exports.AuthUser = AuthUser;
//# sourceMappingURL=auth-user.model.js.map