import { UserModifiableEntity } from '@sourceloop/core';
import { IUserResource } from 'loopback4-authorization';
export declare class UserLevelResource extends UserModifiableEntity implements IUserResource<string> {
    id?: string;
    userTenantId: string;
    resourceName: string;
    resourceValue: string;
    allowed: boolean;
    constructor(data?: Partial<UserLevelResource>);
}
