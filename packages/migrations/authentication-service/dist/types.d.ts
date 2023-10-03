import { AnyObject } from '@loopback/repository';
import { IServiceConfig } from '@sourceloop/core';
import { STRATEGY } from 'loopback4-authentication';
import { OtpMethodType } from './enums';
import { LocalUserProfileDto, UserTenant, LoginActivity } from './models';
import { SignupRequestDto } from './models/signup-request-dto.model';
export interface IAuthServiceConfig extends IServiceConfig {
}
export declare const AuthDbSourceName = "AuthDB";
export declare const AuthCacheSourceName = "AuthCache";
export interface IMfaConfig {
    secondFactor: STRATEGY;
}
export interface IUserActivity {
    markUserActivity: boolean;
}
export interface IOtpConfig {
    method: OtpMethodType;
}
export type PreSignupFn<T, S> = (request: SignupRequestDto<T>) => Promise<S>;
export type UserSignupFn<T, S> = (model: T & LocalUserProfileDto, tokenInfo?: AnyObject) => Promise<S>;
export interface IAuthClientDTO {
    client_id: string;
    client_secret: string;
}
export interface ExternalTokens {
    externalAuthToken?: string;
    externalRefreshToken?: string;
}
export type ActorId = Extract<keyof UserTenant, string>;
export interface ActiveUsersGroupData {
    [key: string]: {
        [loginType: string]: Array<LoginActivity>;
    };
}
