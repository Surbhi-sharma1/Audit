import { Provider } from '@loopback/core';
import { CodeReaderFn } from './types';
export declare class OauthCodeReaderProvider implements Provider<CodeReaderFn> {
    value(): CodeReaderFn;
}
