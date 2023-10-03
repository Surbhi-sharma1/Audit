import { UserModifiableEntity } from '@sourceloop/core';
import { UserWithRelations } from './user.model';
export declare class UserCredentials extends UserModifiableEntity<UserCredentials> {
    id?: string;
    userId: string;
    authProvider: string;
    authId?: string;
    authToken?: string;
    secretKey?: string;
    password?: string;
}
export interface UserCredentialsRelations {
    user: UserWithRelations;
}
export type UserCredentialsWithRelations = UserCredentials & UserCredentialsRelations;
