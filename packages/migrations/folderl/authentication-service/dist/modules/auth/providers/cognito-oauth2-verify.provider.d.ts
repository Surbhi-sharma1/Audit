import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { CognitoPostVerifyFn, CognitoPreVerifyFn, CognitoSignUpFn } from '../../../providers';
import { UserCredentialsRepository, UserRepository } from '../../../repositories';
export declare class CognitoOauth2VerifyProvider implements Provider<VerifyFunction.CognitoAuthFn> {
    userRepository: UserRepository;
    userCredsRepository: UserCredentialsRepository;
    private readonly signupProvider;
    private readonly preVerifyProvider;
    private readonly postVerifyProvider;
    constructor(userRepository: UserRepository, userCredsRepository: UserCredentialsRepository, signupProvider: CognitoSignUpFn, preVerifyProvider: CognitoPreVerifyFn, postVerifyProvider: CognitoPostVerifyFn);
    value(): VerifyFunction.CognitoAuthFn;
}
