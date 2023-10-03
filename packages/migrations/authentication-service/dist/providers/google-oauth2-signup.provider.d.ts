import { Provider } from '@loopback/context';
import { GoogleSignUpFn } from './types';
export declare class GoogleOauth2SignupProvider implements Provider<GoogleSignUpFn> {
    value(): GoogleSignUpFn;
}
