import { Provider } from '@loopback/context';
import { ILogger } from '@sourceloop/core';
import { VerifyFunction } from 'loopback4-authentication';
import { JWTVerifierFn } from '../../../providers';
import { RevokedTokenRepository } from '../../../repositories';
import { AuthUser } from '../models/auth-user.model';
export declare class BearerTokenVerifyProvider implements Provider<VerifyFunction.BearerFn> {
    revokedTokenRepository: RevokedTokenRepository;
    logger: ILogger;
    jwtVerifier: JWTVerifierFn<AuthUser>;
    constructor(revokedTokenRepository: RevokedTokenRepository, logger: ILogger, jwtVerifier: JWTVerifierFn<AuthUser>);
    value(): VerifyFunction.BearerFn;
}
