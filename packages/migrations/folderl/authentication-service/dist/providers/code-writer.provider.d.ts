import { Provider } from '@loopback/core';
import { CodeWriterFn } from './types';
export declare class CodeWriterProvider implements Provider<CodeWriterFn> {
    value(): CodeWriterFn;
}
