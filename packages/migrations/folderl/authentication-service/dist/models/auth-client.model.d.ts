import { UserModifiableEntity } from '@sourceloop/core';
import { IAuthClient } from 'loopback4-authentication';
export declare class AuthClient extends UserModifiableEntity implements IAuthClient {
    id?: number;
    clientId: string;
    clientSecret: string;
    secret: string;
    redirectUrl?: string;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
    authCodeExpiration: number;
    constructor(data?: Partial<AuthClient>);
}
