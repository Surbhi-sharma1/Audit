import { Provider } from '@loopback/context';
import { CognitoPreVerifyFn } from './types';
export declare class CognitoPreVerifyProvider implements Provider<CognitoPreVerifyFn> {
    value(): CognitoPreVerifyFn;
}
