import { Provider } from '@loopback/context';
import { AzureAdSignUpFn } from './types';
export declare class AzureAdSignupProvider implements Provider<AzureAdSignUpFn> {
    value(): AzureAdSignUpFn;
}
