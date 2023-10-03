import { Provider } from '@loopback/context';
import { KeyCloakPostVerifyFn } from './types';
export declare class KeyCloakPostVerifyProvider implements Provider<KeyCloakPostVerifyFn> {
    value(): KeyCloakPostVerifyFn;
}
