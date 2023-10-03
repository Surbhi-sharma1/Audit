/// <reference types="express" />
import { Request, RequestContext } from '@loopback/rest';
import { ILogger, SuccessResponse } from '@sourceloop/core';
import { RefreshTokenRequest } from '../../models';
import { LoginActivityRepository, RefreshTokenRepository, RevokedTokenRepository, UserRepository, UserTenantRepository } from '../../repositories';
import { ActorId } from '../../types';
import { AuthClient, IUserActivity, JwtPayloadFn } from '../..';
export declare class LogoutController {
    private readonly req;
    private readonly revokedTokens;
    refreshTokenRepo: RefreshTokenRepository;
    logger: ILogger;
    private readonly loginActivityRepo;
    private readonly actorKey;
    private readonly ctx;
    userRepo: UserRepository;
    userTenantRepo: UserTenantRepository;
    private readonly getJwtPayload;
    private readonly client;
    private readonly userActivity?;
    constructor(req: Request, revokedTokens: RevokedTokenRepository, refreshTokenRepo: RefreshTokenRepository, logger: ILogger, loginActivityRepo: LoginActivityRepository, actorKey: ActorId, ctx: RequestContext, userRepo: UserRepository, userTenantRepo: UserTenantRepository, getJwtPayload: JwtPayloadFn, client: AuthClient | undefined, userActivity?: IUserActivity | undefined);
    logout(auth: string, req: RefreshTokenRequest): Promise<SuccessResponse>;
    keycloakLogout(auth: string, req: RefreshTokenRequest): Promise<SuccessResponse>;
    private markUserActivity;
}
