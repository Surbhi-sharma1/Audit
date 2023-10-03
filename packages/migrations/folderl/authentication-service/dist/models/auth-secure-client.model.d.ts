import { ClientType, IAuthSecureClient } from 'loopback4-authentication';
import { AuthClient } from './auth-client.model';
export declare class AuthSecureClient extends AuthClient implements IAuthSecureClient {
    clientType: ClientType;
    constructor(data?: Partial<AuthSecureClient>);
}
