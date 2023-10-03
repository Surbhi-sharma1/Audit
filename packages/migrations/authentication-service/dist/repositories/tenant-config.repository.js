"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantConfigRepository = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const core_2 = require("@sourceloop/core");
const loopback4_authentication_1 = require("loopback4-authentication");
const models_1 = require("../models");
const types_1 = require("../types");
let TenantConfigRepository = class TenantConfigRepository extends core_2.DefaultUserModifyCrudRepository {
    constructor(dataSource, getCurrentUser, tenantRepositoryGetter) {
        super(models_1.TenantConfig, dataSource, getCurrentUser);
        this.getCurrentUser = getCurrentUser;
        this.tenantRepositoryGetter = tenantRepositoryGetter;
        this.tenant = this.createBelongsToAccessorFor('tenant', tenantRepositoryGetter);
        this.registerInclusionResolver('tenant', this.tenant.inclusionResolver);
    }
};
TenantConfigRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(`datasources.${types_1.AuthDbSourceName}`)),
    tslib_1.__param(1, core_1.inject.getter(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__param(2, repository_1.repository.getter('TenantRepository')),
    tslib_1.__metadata("design:paramtypes", [repository_1.juggler.DataSource, Function, Function])
], TenantConfigRepository);
exports.TenantConfigRepository = TenantConfigRepository;
//# sourceMappingURL=tenant-config.repository.js.map