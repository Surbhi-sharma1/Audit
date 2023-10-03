"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLevelPermission = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
const user_tenant_model_1 = require("./user-tenant.model");
let UserLevelPermission = class UserLevelPermission extends core_1.UserModifiableEntity {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserLevelPermission.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_tenant_model_1.UserTenant, { keyFrom: 'user_tenant_id', name: 'userTenant' }, {
        name: 'user_tenant_id',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserLevelPermission.prototype, "userTenantId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserLevelPermission.prototype, "permission", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], UserLevelPermission.prototype, "allowed", void 0);
UserLevelPermission = tslib_1.__decorate([
    (0, repository_1.model)({
        name: 'user_permissions',
    })
], UserLevelPermission);
exports.UserLevelPermission = UserLevelPermission;
//# sourceMappingURL=user-level-permission.model.js.map