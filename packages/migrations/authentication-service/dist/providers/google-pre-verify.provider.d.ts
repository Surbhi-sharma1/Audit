import { Provider } from '@loopback/context';
import { GooglePreVerifyFn } from './types';
export declare class GooglePreVerifyProvider implements Provider<GooglePreVerifyFn> {
    value(): GooglePreVerifyFn;
}
