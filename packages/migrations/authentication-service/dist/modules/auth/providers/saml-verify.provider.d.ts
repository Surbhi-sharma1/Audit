import { Provider } from '@loopback/core';
import { VerifyFunction } from 'loopback4-authentication';
import { SamlPostVerifyFn, SamlPreVerifyFn, SamlSignUpFn } from '../../../providers';
import { UserCredentialsRepository, UserRepository } from '../../../repositories';
export declare class SamlVerifyProvider implements Provider<VerifyFunction.SamlFn> {
    userRepository: UserRepository;
    userCredsRepository: UserCredentialsRepository;
    private readonly signupProvider;
    private readonly preVerifyProvider;
    private readonly postVerifyProvider;
    constructor(userRepository: UserRepository, userCredsRepository: UserCredentialsRepository, signupProvider: SamlSignUpFn, preVerifyProvider: SamlPreVerifyFn, postVerifyProvider: SamlPostVerifyFn);
    value(): VerifyFunction.SamlFn;
}
