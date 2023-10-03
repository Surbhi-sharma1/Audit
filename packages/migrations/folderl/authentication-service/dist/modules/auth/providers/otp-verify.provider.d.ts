import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { OtpCacheRepository, UserRepository } from '../../../repositories';
import { ILogger } from '@sourceloop/core';
import { OtpService } from '../../../services';
import { AuthClient } from '../../../models';
export declare class OtpVerifyProvider implements Provider<VerifyFunction.OtpAuthFn> {
    userRepository: UserRepository;
    otpCacheRepo: OtpCacheRepository;
    private readonly logger;
    private readonly client;
    private readonly otpService;
    constructor(userRepository: UserRepository, otpCacheRepo: OtpCacheRepository, logger: ILogger, client: AuthClient, otpService: OtpService);
    value(): VerifyFunction.OtpAuthFn;
}
