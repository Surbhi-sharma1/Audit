import { ILogger } from '@sourceloop/core';
import { AuthClient, IAuthClientDTO, UserTenant } from '..';
import { AuthUser } from '../modules/auth/models/auth-user.model';
import { UserTenantRepository } from '../repositories';
export declare class LoginHelperService {
    private readonly userTenantRepo;
    private readonly logger;
    constructor(userTenantRepo: UserTenantRepository, logger: ILogger);
    verifyClientUserLogin(req: IAuthClientDTO, client?: AuthClient, reqUser?: Pick<AuthUser, 'id' | 'authClientIds'> | null): Promise<Pick<UserTenant, 'status'> | null>;
}
