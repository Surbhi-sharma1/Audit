import { ILogger, SuccessResponse } from '@sourceloop/core';
import { AuthClient, ForgetPasswordDto, ResetPasswordWithClient } from '../models';
import { ForgotPasswordHandlerFn } from '../providers';
import { RevokedTokenRepository, UserRepository } from '../repositories';
import { LoginHelperService } from '../services';
export declare class ForgetPasswordController {
    private readonly userRepo;
    private readonly revokedTokensRepo;
    private readonly loginHelperService;
    logger: ILogger;
    constructor(userRepo: UserRepository, revokedTokensRepo: RevokedTokenRepository, loginHelperService: LoginHelperService, logger: ILogger);
    forgetPassword(req: ForgetPasswordDto, client: AuthClient, forgetPasswordHandler: ForgotPasswordHandlerFn): Promise<void>;
    verifyResetPasswordLink(token: string): Promise<SuccessResponse>;
    resetPassword(req: ResetPasswordWithClient, client: AuthClient): Promise<void>;
}
