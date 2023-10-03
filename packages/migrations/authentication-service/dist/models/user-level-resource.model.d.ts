import { UserModifiableEntity } from '@sourceloop/core';
import { IUserResource } from 'loopback4-authorization';
export declare class UserLevelResource extends UserModifiableEntity<UserLevelResource> implements IUserResource<string> {
    id?: string;
    userTenantId: string;
    resourceName: string;
    resourceValue: string;
    allowed: boolean;
}
