import { IAuthUser } from 'loopback4-authentication';
import { BindingKey } from '@loopback/context';
export declare namespace BearerVerifierBindings {
    const Config: BindingKey<BearerVerifierConfig>;
}
export declare enum BearerVerifierType {
    service = 0,
    facade = 1
}
export interface BearerVerifierConfig {
    type: BearerVerifierType;
}
export interface IUserPrefs {
    locale?: string;
}
export interface IAuthUserWithPermissions<ID = string, TID = string, UTID = string> extends IAuthUser {
    id?: string;
    identifier?: ID;
    permissions: string[];
    authClientId: number;
    userPreferences?: IUserPrefs;
    email?: string;
    role: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    tenantId?: TID;
    userTenantId?: UTID;
    passwordExpiryTime?: Date;
    allowedResources?: string[];
    getIdentifier?(): string | undefined;
}
