import { Getter } from '@loopback/core';
import { BelongsToAccessor, DataObject, HasManyRepositoryFactory, HasOneRepositoryFactory, juggler } from '@loopback/repository';
import { Options } from '@loopback/repository/src/common-types';
import { DefaultUserModifyCrudRepository, IAuthUserWithPermissions, ILogger } from '@sourceloop/core';
import { Tenant, User, UserCredentials, UserRelations, UserTenant } from '../models';
import { OtpRepository } from './otp.repository';
import { TenantRepository } from './tenant.repository';
import { UserCredentialsRepository } from './user-credentials.repository';
import { UserTenantRepository } from './user-tenant.repository';
export declare class UserRepository extends DefaultUserModifyCrudRepository<User, typeof User.prototype.id, UserRelations> {
    getOtpRepository: Getter<OtpRepository>;
    protected readonly getCurrentUser: Getter<IAuthUserWithPermissions | undefined>;
    protected tenantRepositoryGetter: Getter<TenantRepository>;
    protected userTenantRepositoryGetter: Getter<UserTenantRepository>;
    private readonly logger;
    readonly credentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;
    readonly tenant: BelongsToAccessor<Tenant, typeof User.prototype.id>;
    readonly userTenants: HasManyRepositoryFactory<UserTenant, typeof User.prototype.id>;
    constructor(dataSource: juggler.DataSource, getUserCredsRepository: Getter<UserCredentialsRepository>, getOtpRepository: Getter<OtpRepository>, getCurrentUser: Getter<IAuthUserWithPermissions | undefined>, tenantRepositoryGetter: Getter<TenantRepository>, userTenantRepositoryGetter: Getter<UserTenantRepository>, logger: ILogger);
    create(entity: DataObject<User>, options?: Options): Promise<User>;
    createWithoutPassword(entity: DataObject<User>, options?: Options): Promise<User>;
    verifyPassword(username: string, password: string): Promise<User>;
    decryptPassword(password: string): Promise<string>;
    updatePassword(username: string, password: string, newPassword: string): Promise<User>;
    changePassword(username: string, newPassword: string, oldPassword?: string): Promise<User>;
    updateLastLogin(userId: string): Promise<void>;
    firstTimeUser(userId: string): Promise<boolean>;
}
