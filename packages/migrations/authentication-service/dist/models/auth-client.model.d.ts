import { DataObject, Model } from '@loopback/repository';
import { UserModifiableEntity } from '@sourceloop/core';
import { IAuthClient } from 'loopback4-authentication';
export declare class AuthClient<T = DataObject<Model>> extends UserModifiableEntity<T & AuthClient<T>> implements IAuthClient {
    id?: number;
    clientId: string;
    clientSecret: string;
    secret: string;
    redirectUrl?: string;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
    authCodeExpiration: number;
}
