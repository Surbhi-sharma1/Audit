import { Constructor, Provider } from '@loopback/context';
import { VerifyFunction, EntityWithIdentifier, IAuthUser } from 'loopback4-authentication';
import { ILogger } from '../../logger-extension';
export declare class ServicesBearerAsymmetricTokenVerifyProvider implements Provider<VerifyFunction.BearerFn> {
    logger: ILogger;
    authUserModel?: Constructor<EntityWithIdentifier & IAuthUser> | undefined;
    constructor(logger: ILogger, authUserModel?: Constructor<EntityWithIdentifier & IAuthUser> | undefined);
    value(): VerifyFunction.BearerFn;
}
