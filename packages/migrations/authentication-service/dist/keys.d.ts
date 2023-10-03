import { BindingKey } from '@loopback/core';
import { ForgotPasswordHandlerFn, JwtPayloadFn } from './providers';
import { ActorId, IAuthServiceConfig, IMfaConfig, IOtpConfig, IUserActivity } from './types';
export declare namespace AuthServiceBindings {
    const Config: BindingKey<IAuthServiceConfig | null>;
    const MfaConfig: BindingKey<IMfaConfig | null>;
    const OtpConfig: BindingKey<IOtpConfig | null>;
    const JWTPayloadProvider: BindingKey<JwtPayloadFn>;
    const ForgotPasswordHandler: BindingKey<ForgotPasswordHandlerFn>;
    const ActorIdKey: BindingKey<ActorId>;
    const MarkUserActivity: BindingKey<IUserActivity>;
}
export { AuthenticationBindings } from 'loopback4-authentication';
export { AuthorizationBindings } from 'loopback4-authorization';
