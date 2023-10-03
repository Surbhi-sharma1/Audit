import { Provider } from '@loopback/context';
import { SamlSignUpFn } from './types';
export declare class SamlSignupProvider implements Provider<SamlSignUpFn> {
    value(): SamlSignUpFn;
}
