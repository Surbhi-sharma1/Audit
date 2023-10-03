import { Provider } from '@loopback/context';
import { MfaCheckFn } from './types';
export declare class MfaProvider implements Provider<MfaCheckFn> {
    value(): MfaCheckFn;
}
