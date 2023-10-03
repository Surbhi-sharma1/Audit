import { Provider } from '@loopback/context';
import { InstagramPreVerifyFn } from './types';
export declare class InstagramPreVerifyProvider implements Provider<InstagramPreVerifyFn> {
    value(): InstagramPreVerifyFn;
}
