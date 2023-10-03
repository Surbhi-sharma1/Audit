import { Provider } from '@loopback/context';
import { KeyCloakSignUpFn } from './types';
export declare class KeyCloakSignupProvider implements Provider<KeyCloakSignUpFn> {
    value(): KeyCloakSignUpFn;
}
