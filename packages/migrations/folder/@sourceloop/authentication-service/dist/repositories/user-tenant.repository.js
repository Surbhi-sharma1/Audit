"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTenantRepository = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const core_2 = require("@sourceloop/core");
const models_1 = require("../models");
const types_1 = require("../types");
let UserTenantRepository = class UserTenantRepository extends core_2.DefaultSoftCrudRepository {
    constructor(dataSource, tenantRepositoryGetter, userRepositoryGetter, roleRepositoryGetter, userLevelPermissionRepositoryGetter) {
        super(models_1.UserTenant, dataSource);
        this.tenantRepositoryGetter = tenantRepositoryGetter;
        this.userRepositoryGetter = userRepositoryGetter;
        this.roleRepositoryGetter = roleRepositoryGetter;
        this.userLevelPermissionRepositoryGetter = userLevelPermissionRepositoryGetter;
        this.userLevelPermissions = this.createHasManyRepositoryFactoryFor('userLevelPermissions', userLevelPermissionRepositoryGetter);
        this.registerInclusionResolver('userLevelPermissions', this.userLevelPermissions.inclusionResolver);
        this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
        this.registerInclusionResolver('role', this.role.inclusionResolver);
        this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
        this.registerInclusionResolver('user', this.user.inclusionResolver);
        this.tenant = this.createBelongsToAccessorFor('tenant', tenantRepositoryGetter);
        this.registerInclusionResolver('tenant', this.tenant.inclusionResolver);
    }
};
UserTenantRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(`datasources.${types_1.AuthDbSourceName}`)),
    tslib_1.__param(1, repository_1.repository.getter('TenantRepository')),
    tslib_1.__param(2, repository_1.repository.getter('UserRepository')),
    tslib_1.__param(3, repository_1.repository.getter('RoleRepository')),
    tslib_1.__param(4, repository_1.repository.getter('UserLevelPermissionRepository')),
    tslib_1.__metadata("design:paramtypes", [repository_1.juggler.DataSource, Function, Function, Function, Function])
], UserTenantRepository);
exports.UserTenantRepository = UserTenantRepository;
//# sourceMappingURL=user-tenant.repository.js.map