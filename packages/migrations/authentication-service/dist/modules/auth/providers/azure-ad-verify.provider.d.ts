import { Provider } from '@loopback/core';
import { VerifyFunction } from 'loopback4-authentication';
import { AzureAdPostVerifyFn, AzureAdPreVerifyFn, AzureAdSignUpFn } from '../../../providers';
import { UserCredentialsRepository, UserRepository } from '../../../repositories';
export declare class AzureAdVerifyProvider implements Provider<VerifyFunction.AzureADAuthFn> {
    userRepository: UserRepository;
    userCredsRepository: UserCredentialsRepository;
    private readonly signupProvider;
    private readonly preVerifyProvider;
    private readonly postVerifyProvider;
    constructor(userRepository: UserRepository, userCredsRepository: UserCredentialsRepository, signupProvider: AzureAdSignUpFn, preVerifyProvider: AzureAdPreVerifyFn, postVerifyProvider: AzureAdPostVerifyFn);
    value(): VerifyFunction.AzureADAuthFn;
}
