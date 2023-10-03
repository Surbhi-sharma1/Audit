/// <reference types="express" />
import { Response } from '@loopback/rest';
import { ILogger } from '@sourceloop/core';
import { AuthCodeGeneratorFn } from '../../providers';
import { AuthClientRepository } from '../../repositories';
import { AuthUser } from './models/auth-user.model';
import { ClientAuthRequest } from './models/client-auth-request.dto';
export declare class FacebookLoginController {
    authClientRepository: AuthClientRepository;
    logger: ILogger;
    private readonly getAuthCode;
    constructor(authClientRepository: AuthClientRepository, logger: ILogger, getAuthCode: AuthCodeGeneratorFn);
    postLoginViaFacebook(clientCreds?: ClientAuthRequest): Promise<void>;
    facebookCallback(code: string, state: string, response: Response, user: AuthUser | undefined): Promise<void>;
}
