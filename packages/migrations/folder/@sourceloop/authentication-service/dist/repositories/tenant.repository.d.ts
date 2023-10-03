import { Getter } from '@loopback/core';
import { HasManyRepositoryFactory, juggler } from '@loopback/repository';
import { DefaultUserModifyCrudRepository, IAuthUserWithPermissions } from '@sourceloop/core';
import { Tenant, TenantConfig } from '../models';
import { TenantConfigRepository } from './tenant-config.repository';
export declare class TenantRepository extends DefaultUserModifyCrudRepository<Tenant, typeof Tenant.prototype.id> {
    protected readonly getCurrentUser: Getter<IAuthUserWithPermissions | undefined>;
    protected tenantConfigRepositoryGetter: Getter<TenantConfigRepository>;
    readonly tenantConfigs: HasManyRepositoryFactory<TenantConfig, typeof Tenant.prototype.id>;
    constructor(dataSource: juggler.DataSource, getCurrentUser: Getter<IAuthUserWithPermissions | undefined>, tenantConfigRepositoryGetter: Getter<TenantConfigRepository>);
}
