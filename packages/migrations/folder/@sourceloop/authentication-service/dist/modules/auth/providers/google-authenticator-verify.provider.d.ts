import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { OtpCacheRepository, UserCredentialsRepository, UserRepository } from '../../../repositories';
import { ILogger } from '@sourceloop/core';
export declare class GoogleAuthenticatorVerifyProvider implements Provider<VerifyFunction.OtpAuthFn> {
    userRepository: UserRepository;
    userCredsRepository: UserCredentialsRepository;
    otpCacheRepo: OtpCacheRepository;
    private readonly logger;
    constructor(userRepository: UserRepository, userCredsRepository: UserCredentialsRepository, otpCacheRepo: OtpCacheRepository, logger: ILogger);
    value(): VerifyFunction.OtpAuthFn;
}
