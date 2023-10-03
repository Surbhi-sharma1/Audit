/// <reference types="express" />
import { Response } from '@loopback/rest';
import { ILogger } from '@sourceloop/core';
import { AuthCodeGeneratorFn } from '../../providers';
import { AuthClientRepository } from '../../repositories';
import { AuthUser } from './models/auth-user.model';
import { ClientAuthRequest } from './models/client-auth-request.dto';
export declare class KeycloakLoginController {
    authClientRepository: AuthClientRepository;
    logger: ILogger;
    private readonly getAuthCode;
    constructor(authClientRepository: AuthClientRepository, logger: ILogger, getAuthCode: AuthCodeGeneratorFn);
    postLoginViaKeycloak(clientCreds?: ClientAuthRequest): Promise<void>;
    loginViaKeycloak(clientId?: string, //NOSONAR
    clientSecret?: string): Promise<void>;
    keycloakCallback(code: string, state: string, response: Response, user: AuthUser | undefined): Promise<void>;
}
