import { Provider } from '@loopback/context';
import { FacebookSignUpFn } from './types';
export declare class FacebookOauth2SignupProvider implements Provider<FacebookSignUpFn> {
    value(): FacebookSignUpFn;
}
