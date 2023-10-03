import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { AuthSecureClientRepository } from '../../../repositories';
export declare class SecureClientPasswordVerifyProvider implements Provider<VerifyFunction.OauthClientPasswordFn> {
    authSecureClientRepository: AuthSecureClientRepository;
    constructor(authSecureClientRepository: AuthSecureClientRepository);
    value(): VerifyFunction.OauthClientPasswordFn;
}
