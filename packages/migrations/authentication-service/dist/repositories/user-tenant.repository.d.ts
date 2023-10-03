import { Getter } from '@loopback/core';
import { BelongsToAccessor, HasManyRepositoryFactory, juggler } from '@loopback/repository';
import { DefaultSoftCrudRepository } from '@sourceloop/core';
import { Role, Tenant, User, UserLevelPermission, UserTenant, UserTenantRelations } from '../models';
import { RoleRepository } from './role.repository';
import { TenantRepository } from './tenant.repository';
import { UserLevelPermissionRepository } from './user-level-permission.repository';
import { UserRepository } from './user.repository';
export declare class UserTenantRepository extends DefaultSoftCrudRepository<UserTenant, typeof UserTenant.prototype.id, UserTenantRelations> {
    protected tenantRepositoryGetter: Getter<TenantRepository>;
    protected userRepositoryGetter: Getter<UserRepository>;
    protected roleRepositoryGetter: Getter<RoleRepository>;
    protected userLevelPermissionRepositoryGetter: Getter<UserLevelPermissionRepository>;
    readonly tenant: BelongsToAccessor<Tenant, typeof UserTenant.prototype.id>;
    readonly user: BelongsToAccessor<User, typeof UserTenant.prototype.id>;
    readonly role: BelongsToAccessor<Role, typeof UserTenant.prototype.id>;
    readonly userLevelPermissions: HasManyRepositoryFactory<UserLevelPermission, typeof UserTenant.prototype.id>;
    constructor(dataSource: juggler.DataSource, tenantRepositoryGetter: Getter<TenantRepository>, userRepositoryGetter: Getter<UserRepository>, roleRepositoryGetter: Getter<RoleRepository>, userLevelPermissionRepositoryGetter: Getter<UserLevelPermissionRepository>);
}
