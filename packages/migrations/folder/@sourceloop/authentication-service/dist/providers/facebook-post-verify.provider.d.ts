import { Provider } from '@loopback/context';
import { FacebookPostVerifyFn } from './types';
export declare class FacebookPostVerifyProvider implements Provider<FacebookPostVerifyFn> {
    value(): FacebookPostVerifyFn;
}
