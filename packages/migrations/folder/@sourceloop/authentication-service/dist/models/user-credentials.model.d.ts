import { UserModifiableEntity } from '@sourceloop/core';
import { UserWithRelations } from './user.model';
export declare class UserCredentials extends UserModifiableEntity {
    id?: string;
    userId: string;
    authProvider: string;
    authId?: string;
    authToken?: string;
    secretKey?: string;
    password?: string;
    constructor(data?: Partial<UserCredentials>);
}
export interface UserCredentialsRelations {
    user: UserWithRelations;
}
export type UserCredentialsWithRelations = UserCredentials & UserCredentialsRelations;
