import { UserStatus, IUserPrefs, UserModifiableEntity } from '@sourceloop/core';
import { RoleWithRelations } from './role.model';
import { TenantWithRelations } from './tenant.model';
import { UserLevelPermission } from './user-level-permission.model';
import { UserWithRelations } from './user.model';
export declare class UserTenant extends UserModifiableEntity implements IUserPrefs {
    id?: string;
    status?: UserStatus;
    locale?: string;
    tenantId: string;
    userId: string;
    roleId: string;
    userLevelPermissions: UserLevelPermission[];
    constructor(data?: Partial<UserTenant>);
}
export interface UserTenantRelations {
    user: UserWithRelations;
    tenant: TenantWithRelations;
    role: RoleWithRelations;
}
export type UserTenantWithRelations = UserTenant & UserTenantRelations;
