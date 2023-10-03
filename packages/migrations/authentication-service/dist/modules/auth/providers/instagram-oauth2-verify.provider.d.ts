import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { InstagramPostVerifyFn, InstagramPreVerifyFn, InstagramSignUpFn } from '../../../providers';
import { UserCredentialsRepository, UserRepository } from '../../../repositories';
export declare class InstagramOauth2VerifyProvider implements Provider<VerifyFunction.InstagramAuthFn> {
    userRepository: UserRepository;
    userCredsRepository: UserCredentialsRepository;
    private readonly signupProvider;
    private readonly preVerifyProvider;
    private readonly postVerifyProvider;
    constructor(userRepository: UserRepository, userCredsRepository: UserCredentialsRepository, signupProvider: InstagramSignUpFn, preVerifyProvider: InstagramPreVerifyFn, postVerifyProvider: InstagramPostVerifyFn);
    value(): VerifyFunction.InstagramAuthFn;
}
