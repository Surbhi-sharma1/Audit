import { Getter } from '@loopback/core';
import { BelongsToAccessor, juggler } from '@loopback/repository';
import { DefaultUserModifyCrudRepository, IAuthUserWithPermissions } from '@sourceloop/core';
import { Tenant, TenantConfig } from '../models';
import { TenantRepository } from './tenant.repository';
export declare class TenantConfigRepository extends DefaultUserModifyCrudRepository<TenantConfig, typeof TenantConfig.prototype.id, {}> {
    protected readonly getCurrentUser: Getter<IAuthUserWithPermissions | undefined>;
    protected tenantRepositoryGetter: Getter<TenantRepository>;
    readonly tenant: BelongsToAccessor<Tenant, typeof TenantConfig.prototype.id>;
    constructor(dataSource: juggler.DataSource, getCurrentUser: Getter<IAuthUserWithPermissions | undefined>, tenantRepositoryGetter: Getter<TenantRepository>);
}
