import { UserPermission } from 'loopback4-authorization';
import { UserModifiableEntity } from '@sourceloop/core';
export declare class UserLevelPermission extends UserModifiableEntity implements UserPermission<string> {
    id?: string;
    userTenantId: string;
    permission: string;
    allowed: boolean;
    constructor(data?: Partial<UserLevelPermission>);
}
