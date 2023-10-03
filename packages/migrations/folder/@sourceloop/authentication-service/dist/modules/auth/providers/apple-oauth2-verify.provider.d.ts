import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { ApplePostVerifyFn, ApplePreVerifyFn, AppleSignUpFn } from '../../../providers';
import { UserCredentialsRepository, UserRepository } from '../../../repositories';
export declare class AppleOauth2VerifyProvider implements Provider<VerifyFunction.AppleAuthFn> {
    userRepository: UserRepository;
    userCredsRepository: UserCredentialsRepository;
    private readonly signupProvider;
    private readonly preVerifyProvider;
    private readonly postVerifyProvider;
    constructor(userRepository: UserRepository, userCredsRepository: UserCredentialsRepository, signupProvider: AppleSignUpFn, preVerifyProvider: ApplePreVerifyFn, postVerifyProvider: ApplePostVerifyFn);
    value(): VerifyFunction.AppleAuthFn;
}
