import { Provider } from '@loopback/context';
import { CognitoSignUpFn } from './types';
export declare class CognitoOauth2SignupProvider implements Provider<CognitoSignUpFn> {
    value(): CognitoSignUpFn;
}
