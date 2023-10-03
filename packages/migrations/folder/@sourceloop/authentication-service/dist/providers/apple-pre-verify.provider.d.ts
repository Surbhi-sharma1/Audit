import { Provider } from '@loopback/context';
import { ApplePreVerifyFn } from './types';
export declare class ApplePreVerifyProvider implements Provider<ApplePreVerifyFn> {
    value(): ApplePreVerifyFn;
}
