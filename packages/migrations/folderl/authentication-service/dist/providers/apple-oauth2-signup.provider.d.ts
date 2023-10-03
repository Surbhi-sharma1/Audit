import { Provider } from '@loopback/context';
import { AppleSignUpFn } from './types';
export declare class AppleOauth2SignupProvider implements Provider<AppleSignUpFn> {
    value(): AppleSignUpFn;
}
