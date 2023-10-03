import { ILogger } from '@sourceloop/core';
import { AuthClient, User } from '../models';
import { OtpResponse } from '../modules/auth';
import { OtpFn } from '../providers';
import { OtpCacheRepository, UserRepository } from '../repositories';
export declare class OtpService {
    private readonly otpCacheRepo;
    userRepository: UserRepository;
    private readonly logger;
    private readonly otpSender;
    constructor(otpCacheRepo: OtpCacheRepository, userRepository: UserRepository, logger: ILogger, otpSender: OtpFn);
    sendOtp(user: User | null, client?: AuthClient): Promise<OtpResponse | void>;
}
