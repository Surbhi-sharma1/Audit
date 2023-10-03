import { Provider } from '@loopback/context';
import { InstagramSignUpFn } from './types';
export declare class InstagramOauth2SignupProvider implements Provider<InstagramSignUpFn> {
    value(): InstagramSignUpFn;
}
