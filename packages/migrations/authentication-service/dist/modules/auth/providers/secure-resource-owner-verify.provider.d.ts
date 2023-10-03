import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { AuthSecureClientRepository, OtpRepository, UserRepository, UserTenantRepository } from '../../../repositories';
export declare class SecureResourceOwnerVerifyProvider implements Provider<VerifyFunction.SecureResourceOwnerPasswordFn> {
    userRepository: UserRepository;
    utRepository: UserTenantRepository;
    authSecureClientRepository: AuthSecureClientRepository;
    otpRepository: OtpRepository;
    constructor(userRepository: UserRepository, utRepository: UserTenantRepository, authSecureClientRepository: AuthSecureClientRepository, otpRepository: OtpRepository);
    value(): VerifyFunction.SecureResourceOwnerPasswordFn;
}
