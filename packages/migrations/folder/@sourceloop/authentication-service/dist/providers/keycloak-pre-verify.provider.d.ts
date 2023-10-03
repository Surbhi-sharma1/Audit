import { Provider } from '@loopback/context';
import { KeyCloakPreVerifyFn } from './types';
export declare class KeyCloakPreVerifyProvider implements Provider<KeyCloakPreVerifyFn> {
    value(): KeyCloakPreVerifyFn;
}
