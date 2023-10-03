import { UserModifiableEntity } from '@sourceloop/core';
import { UserPermission } from 'loopback4-authorization';
export declare class UserLevelPermission extends UserModifiableEntity<UserLevelPermission> implements UserPermission<string> {
    id?: string;
    userTenantId: string;
    permission: string;
    allowed: boolean;
}
