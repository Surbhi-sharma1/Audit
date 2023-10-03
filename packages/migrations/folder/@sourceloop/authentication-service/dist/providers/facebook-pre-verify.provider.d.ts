import { Provider } from '@loopback/context';
import { FacebookPreVerifyFn } from './types';
export declare class FacebookPreVerifyProvider implements Provider<FacebookPreVerifyFn> {
    value(): FacebookPreVerifyFn;
}
