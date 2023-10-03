/// <reference types="express" />
import { Response } from '@loopback/rest';
import { ILogger } from '@sourceloop/core';
import { AuthCodeGeneratorFn } from '../../providers';
import { AuthClientRepository } from '../../repositories';
import { AuthUser } from './models/auth-user.model';
import { ClientAuthRequest } from './models/client-auth-request.dto';
export declare class InstagramLoginController {
    authClientRepository: AuthClientRepository;
    logger: ILogger;
    private readonly getAuthCode;
    constructor(authClientRepository: AuthClientRepository, logger: ILogger, getAuthCode: AuthCodeGeneratorFn);
    postLoginViaInstagram(clientCreds?: ClientAuthRequest): Promise<void>;
    instagramCallback(code: string, state: string, response: Response, user: AuthUser | undefined): Promise<void>;
}
