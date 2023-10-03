import { Provider } from '@loopback/context';
import { SamlPreVerifyFn } from './types';
export declare class SamlPreVerifyProvider implements Provider<SamlPreVerifyFn> {
    value(): SamlPreVerifyFn;
}
