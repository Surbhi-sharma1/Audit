import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { AuthClientRepository, OtpRepository, UserRepository, UserTenantRepository } from '../../../repositories';
export declare class ResourceOwnerVerifyProvider implements Provider<VerifyFunction.ResourceOwnerPasswordFn> {
    userRepository: UserRepository;
    utRepository: UserTenantRepository;
    authClientRepository: AuthClientRepository;
    otpRepository: OtpRepository;
    constructor(userRepository: UserRepository, utRepository: UserTenantRepository, authClientRepository: AuthClientRepository, otpRepository: OtpRepository);
    value(): VerifyFunction.ResourceOwnerPasswordFn;
}
