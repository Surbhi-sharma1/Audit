import { Provider } from '@loopback/context';
import { CognitoPostVerifyFn } from './types';
export declare class CognitoPostVerifyProvider implements Provider<CognitoPostVerifyFn> {
    value(): CognitoPostVerifyFn;
}
