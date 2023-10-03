"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
const tenant_config_model_1 = require("./tenant-config.model");
let Tenant = class Tenant extends core_1.UserModifiableEntity {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "key", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "address", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "city", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "state", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "zip", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "country", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        description: 'Tenant status - Active or Inactive',
        jsonSchema: {
            enum: [1 /* TenantStatus.ACTIVE */, 0 /* TenantStatus.INACTIVE */],
        },
    }),
    tslib_1.__metadata("design:type", Number)
], Tenant.prototype, "status", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => tenant_config_model_1.TenantConfig, { keyTo: 'tenantId' }),
    tslib_1.__metadata("design:type", Array)
], Tenant.prototype, "tenantConfigs", void 0);
Tenant = tslib_1.__decorate([
    (0, repository_1.model)({
        name: 'tenants',
    })
], Tenant);
exports.Tenant = Tenant;
//# sourceMappingURL=tenant.model.js.map