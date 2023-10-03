/// <reference types="express" />
import { Response } from '@loopback/rest';
import { ILogger } from '@sourceloop/core';
import { AuthCodeGeneratorFn } from '../../providers';
import { AuthClientRepository } from '../../repositories';
import { AuthUser } from './models/auth-user.model';
import { ClientAuthRequest } from './models/client-auth-request.dto';
export declare class CognitoLoginController {
    authClientRepository: AuthClientRepository;
    logger: ILogger;
    private readonly getAuthCode;
    constructor(authClientRepository: AuthClientRepository, logger: ILogger, getAuthCode: AuthCodeGeneratorFn);
    loginViaCognito(user: AuthUser | undefined, clientId?: string, clientSecret?: string): Promise<void>;
    postLoginViaCognito(clientCreds?: ClientAuthRequest): Promise<void>;
    cognitoCallback(code: string, state: string, response: Response, user: AuthUser | undefined): Promise<void>;
}
