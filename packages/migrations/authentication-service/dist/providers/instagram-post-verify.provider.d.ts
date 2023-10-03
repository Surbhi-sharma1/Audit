import { Provider } from '@loopback/context';
import { InstagramPostVerifyFn } from './types';
export declare class InstagramPostVerifyProvider implements Provider<InstagramPostVerifyFn> {
    value(): InstagramPostVerifyFn;
}
