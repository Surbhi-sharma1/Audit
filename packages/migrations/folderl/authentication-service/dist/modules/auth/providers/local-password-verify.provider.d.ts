import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { OtpRepository, UserRepository, UserTenantRepository } from '../../../repositories';
export declare class LocalPasswordVerifyProvider implements Provider<VerifyFunction.LocalPasswordFn> {
    userRepository: UserRepository;
    utRepository: UserTenantRepository;
    otpRepository: OtpRepository;
    constructor(userRepository: UserRepository, utRepository: UserTenantRepository, otpRepository: OtpRepository);
    value(): VerifyFunction.LocalPasswordFn;
}
