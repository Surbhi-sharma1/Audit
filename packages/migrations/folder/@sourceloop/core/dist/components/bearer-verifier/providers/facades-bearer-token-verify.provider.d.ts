import { Constructor, Provider } from '@loopback/context';
import { VerifyFunction, EntityWithIdentifier, IAuthUser } from 'loopback4-authentication';
import { ILogger } from '../../logger-extension';
import { RevokedTokenRepository } from '../repositories';
export declare class FacadesBearerTokenVerifyProvider implements Provider<VerifyFunction.BearerFn> {
    revokedTokenRepository: RevokedTokenRepository;
    private readonly logger;
    authUserModel?: Constructor<EntityWithIdentifier & IAuthUser> | undefined;
    constructor(revokedTokenRepository: RevokedTokenRepository, logger: ILogger, authUserModel?: Constructor<EntityWithIdentifier & IAuthUser> | undefined);
    value(): VerifyFunction.BearerFn;
}
