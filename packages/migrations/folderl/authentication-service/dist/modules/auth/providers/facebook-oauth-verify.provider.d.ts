import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { FacebookPostVerifyFn, FacebookPreVerifyFn, FacebookSignUpFn } from '../../../providers';
import { UserCredentialsRepository, UserRepository } from '../../../repositories';
export declare class FacebookOauth2VerifyProvider implements Provider<VerifyFunction.FacebookAuthFn> {
    userRepository: UserRepository;
    userCredsRepository: UserCredentialsRepository;
    private readonly signupProvider;
    private readonly preVerifyProvider;
    private readonly postVerifyProvider;
    constructor(userRepository: UserRepository, userCredsRepository: UserCredentialsRepository, signupProvider: FacebookSignUpFn, preVerifyProvider: FacebookPreVerifyFn, postVerifyProvider: FacebookPostVerifyFn);
    value(): VerifyFunction.FacebookAuthFn;
}
