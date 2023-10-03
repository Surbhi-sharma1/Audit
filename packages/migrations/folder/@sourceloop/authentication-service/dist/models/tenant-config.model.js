"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantConfig = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
const tenant_model_1 = require("./tenant.model");
let TenantConfig = class TenantConfig extends core_1.UserModifiableEntity {
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
], TenantConfig.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        name: 'config_key',
    }),
    tslib_1.__metadata("design:type", String)
], TenantConfig.prototype, "configKey", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
        name: 'config_value',
    }),
    tslib_1.__metadata("design:type", Object)
], TenantConfig.prototype, "configValue", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => tenant_model_1.Tenant, { keyFrom: 'tenant_id', name: 'tenant' }, {
        name: 'tenant_id',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], TenantConfig.prototype, "tenantId", void 0);
TenantConfig = tslib_1.__decorate([
    (0, repository_1.model)({
        name: 'tenant_configs',
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], TenantConfig);
exports.TenantConfig = TenantConfig;
//# sourceMappingURL=tenant-config.model.js.map