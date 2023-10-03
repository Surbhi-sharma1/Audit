import { Provider } from '@loopback/context';
import { VerifyFunction } from 'loopback4-authentication';
import { KeyCloakPostVerifyFn, KeyCloakPreVerifyFn, KeyCloakSignUpFn } from '../../../providers/types';
import { UserCredentialsRepository, UserRepository } from '../../../repositories';
export declare class KeycloakVerifyProvider implements Provider<VerifyFunction.KeycloakAuthFn> {
    userRepository: UserRepository;
    userCredsRepository: UserCredentialsRepository;
    private readonly signupProvider;
    private readonly preVerifyProvider;
    private readonly postVerifyProvider;
    constructor(userRepository: UserRepository, userCredsRepository: UserCredentialsRepository, signupProvider: KeyCloakSignUpFn, preVerifyProvider: KeyCloakPreVerifyFn, postVerifyProvider: KeyCloakPostVerifyFn);
    value(): VerifyFunction.KeycloakAuthFn;
}
