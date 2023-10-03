import { Provider } from '@loopback/context';
import { SamlPostVerifyFn } from './types';
export declare class SamlPostVerifyProvider implements Provider<SamlPostVerifyFn> {
    value(): SamlPostVerifyFn;
}
