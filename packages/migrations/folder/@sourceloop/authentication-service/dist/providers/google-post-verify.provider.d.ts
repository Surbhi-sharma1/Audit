import { Provider } from '@loopback/context';
import { GooglePostVerifyFn } from './types';
export declare class GooglePostVerifyProvider implements Provider<GooglePostVerifyFn> {
    value(): GooglePostVerifyFn;
}
