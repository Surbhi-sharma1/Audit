import { ILogger } from '@sourceloop/core';
import { CodeReaderFn, CodeWriterFn } from '../../providers';
import { AuthClientRepository, OtpCacheRepository, UserCredentialsRepository, UserRepository } from '../../repositories';
import { AuthTokenRequest, CodeResponse, OtpLoginRequest, QrCodeCheckResponse, QrCodeCreateResponse } from './';
import { AuthUser } from './models/auth-user.model';
import { OtpSendRequest } from './models/otp-send-request.dto';
export declare class OtpController {
    authClientRepository: AuthClientRepository;
    userRepo: UserRepository;
    otpCacheRepo: OtpCacheRepository;
    userCredsRepository: UserCredentialsRepository;
    logger: ILogger;
    constructor(authClientRepository: AuthClientRepository, userRepo: UserRepository, otpCacheRepo: OtpCacheRepository, userCredsRepository: UserCredentialsRepository, logger: ILogger);
    sendOtp(req: OtpSendRequest): Promise<void>;
    verifyOtp(req: OtpLoginRequest, user: AuthUser | undefined, codeWriter: CodeWriterFn): Promise<CodeResponse>;
    checkQr(code: string, clientId: string, codeReader: CodeReaderFn): Promise<QrCodeCheckResponse>;
    createQr(req: AuthTokenRequest, codeReader: CodeReaderFn): Promise<QrCodeCreateResponse>;
}
