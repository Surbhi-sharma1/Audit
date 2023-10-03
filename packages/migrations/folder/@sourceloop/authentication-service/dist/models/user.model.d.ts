import { IAuthUser } from 'loopback4-authentication';
import { Gender, UserModifiableEntity } from '@sourceloop/core';
import { TenantWithRelations } from './tenant.model';
import { UserCredentials, UserCredentialsWithRelations } from './user-credentials.model';
import { UserTenant, UserTenantWithRelations } from './user-tenant.model';
export declare class User extends UserModifiableEntity implements IAuthUser {
    id?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    username: string;
    email?: string;
    phone?: string;
    authClientIds?: string;
    lastLogin?: Date;
    dob: Date;
    gender?: Gender;
    credentials: UserCredentials;
    defaultTenantId: string;
    userTenants: UserTenant[];
    constructor(data?: Partial<User>);
}
export interface UserRelations {
    defaultTenant: TenantWithRelations;
    credentials: UserCredentialsWithRelations;
    userTenant: UserTenantWithRelations;
}
export type UserWithRelations = User & UserRelations;
