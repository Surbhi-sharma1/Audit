"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLevelResource = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
const user_tenant_model_1 = require("./user-tenant.model");
let UserLevelResource = class UserLevelResource extends core_1.UserModifiableEntity {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], UserLevelResource.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_tenant_model_1.UserTenant, { keyFrom: 'user_tenant_id', name: 'userTenant' }, {
        name: 'user_tenant_id',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserLevelResource.prototype, "userTenantId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        name: 'resource_name',
    }),
    tslib_1.__metadata("design:type", String)
], UserLevelResource.prototype, "resourceName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        name: 'resource_value',
    }),
    tslib_1.__metadata("design:type", String)
], UserLevelResource.prototype, "resourceValue", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
        default: true,
        name: 'allowed',
    }),
    tslib_1.__metadata("design:type", Boolean)
], UserLevelResource.prototype, "allowed", void 0);
UserLevelResource = tslib_1.__decorate([
    (0, repository_1.model)({
        name: 'user_resources',
    })
], UserLevelResource);
exports.UserLevelResource = UserLevelResource;
//# sourceMappingURL=user-level-resource.model.js.map