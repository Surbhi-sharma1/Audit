import { Provider } from '@loopback/core';
import { ILogger } from '@sourceloop/core';
import { IAuthClient, IAuthUser } from 'loopback4-authentication';
import { UserPermissionsFn } from 'loopback4-authorization';
import { RoleRepository, TenantConfigRepository, UserLevelPermissionRepository, UserTenantRepository } from '../repositories';
import { JwtPayloadFn } from './types';
export declare class JwtPayloadProvider implements Provider<JwtPayloadFn> {
    private readonly roleRepo;
    private readonly utPermsRepo;
    private readonly userTenantRepo;
    private readonly tenantConfigRepo;
    private readonly getUserPermissions;
    private readonly logger;
    constructor(roleRepo: RoleRepository, utPermsRepo: UserLevelPermissionRepository, userTenantRepo: UserTenantRepository, tenantConfigRepo: TenantConfigRepository, getUserPermissions: UserPermissionsFn<string>, logger: ILogger);
    value(): (authUserData: IAuthUser, authClient: IAuthClient, tenantId?: string) => Promise<Object>;
    private _removeUnnecessaryData;
    private _setLocale;
}
