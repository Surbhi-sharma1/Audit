import { DataObject, Model } from '@loopback/repository';
import { Gender, UserModifiableEntity } from '@sourceloop/core';
import { IAuthUser } from 'loopback4-authentication';
import { TenantWithRelations } from './tenant.model';
import { UserCredentials, UserCredentialsWithRelations } from './user-credentials.model';
import { UserTenant, UserTenantWithRelations } from './user-tenant.model';
export declare class User<T = DataObject<Model>> extends UserModifiableEntity<T & User> implements IAuthUser {
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
}
export interface UserRelations {
    defaultTenant: TenantWithRelations;
    credentials: UserCredentialsWithRelations;
    userTenant: UserTenantWithRelations;
}
export type UserWithRelations = User & UserRelations;
