import { Getter } from '@loopback/core';
import { BelongsToAccessor, juggler } from '@loopback/repository';
import { DefaultUserModifyCrudRepository, IAuthUserWithPermissions } from '@sourceloop/core';
import { UserLevelPermission, UserTenant } from '../models';
import { UserTenantRepository } from './user-tenant.repository';
export declare class UserLevelPermissionRepository extends DefaultUserModifyCrudRepository<UserLevelPermission, typeof UserLevelPermission.prototype.id> {
    protected readonly getCurrentUser: Getter<IAuthUserWithPermissions | undefined>;
    protected userTenantRepositoryGetter: Getter<UserTenantRepository>;
    readonly userTenant: BelongsToAccessor<UserTenant, typeof UserLevelPermission.prototype.id>;
    constructor(dataSource: juggler.DataSource, getCurrentUser: Getter<IAuthUserWithPermissions | undefined>, userTenantRepositoryGetter: Getter<UserTenantRepository>);
}
