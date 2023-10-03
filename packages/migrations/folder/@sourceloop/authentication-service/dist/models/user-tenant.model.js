"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTenant = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
const role_model_1 = require("./role.model");
const tenant_model_1 = require("./tenant.model");
const user_level_permission_model_1 = require("./user-level-permission.model");
const user_model_1 = require("./user.model");
let UserTenant = class UserTenant extends core_1.UserModifiableEntity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
    }),
    tslib_1.__metadata("design:type", String)
], UserTenant.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        jsonSchema: {
            maximum: 12,
            minimum: 0,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], UserTenant.prototype, "status", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserTenant.prototype, "locale", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => tenant_model_1.Tenant, { keyFrom: 'tenant_id', name: 'tenant' }, {
        name: 'tenant_id',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserTenant.prototype, "tenantId", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_model_1.User, { keyFrom: 'user_id', name: 'user' }, {
        name: 'user_id',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserTenant.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => role_model_1.Role, { keyFrom: 'role_id', name: 'role' }, {
        name: 'role_id',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserTenant.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => user_level_permission_model_1.UserLevelPermission, { keyTo: 'userTenantId' }),
    tslib_1.__metadata("design:type", Array)
], UserTenant.prototype, "userLevelPermissions", void 0);
UserTenant = tslib_1.__decorate([
    (0, repository_1.model)({
        name: 'user_tenants',
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserTenant);
exports.UserTenant = UserTenant;
//# sourceMappingURL=user-tenant.model.js.map