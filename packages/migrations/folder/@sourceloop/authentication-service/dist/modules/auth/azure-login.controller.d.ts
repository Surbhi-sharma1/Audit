/// <reference types="express" />
import { Response } from '@loopback/rest';
import { ILogger } from '@sourceloop/core';
import { AuthCodeGeneratorFn } from '../../providers';
import { AuthClientRepository } from '../../repositories';
import { AuthUser } from './models/auth-user.model';
import { ClientAuthRequest } from './models/client-auth-request.dto';
export declare class AzureLoginController {
    authClientRepository: AuthClientRepository;
    logger: ILogger;
    private readonly getAuthCode;
    constructor(authClientRepository: AuthClientRepository, logger: ILogger, getAuthCode: AuthCodeGeneratorFn);
    getLoginViaAzure(clientId?: string, //NOSONAR
    clientSecret?: string): Promise<void>;
    postLoginViaAzure(clientCreds?: ClientAuthRequest): Promise<void>;
    azureCallback(code: string, //NOSONAR
    state: string, sessionState: string, //NOSONAR
    response: Response, user: AuthUser | undefined): Promise<void>;
}
