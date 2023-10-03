import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { GooglePostVerifyFn, GooglePreVerifyFn, GoogleSignUpFn } from '../../../providers';
import { UserCredentialsRepository, UserRepository } from '../../../repositories';
export declare class GoogleOauth2VerifyProvider implements Provider<VerifyFunction.GoogleAuthFn> {
    userRepository: UserRepository;
    userCredsRepository: UserCredentialsRepository;
    private readonly signupProvider;
    private readonly preVerifyProvider;
    private readonly postVerifyProvider;
    constructor(userRepository: UserRepository, userCredsRepository: UserCredentialsRepository, signupProvider: GoogleSignUpFn, preVerifyProvider: GooglePreVerifyFn, postVerifyProvider: GooglePostVerifyFn);
    value(): VerifyFunction.GoogleAuthFn;
}
