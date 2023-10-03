import { Provider } from '@loopback/context';
import { ApplePostVerifyFn } from './types';
export declare class ApplePostVerifyProvider implements Provider<ApplePostVerifyFn> {
    value(): ApplePostVerifyFn;
}
