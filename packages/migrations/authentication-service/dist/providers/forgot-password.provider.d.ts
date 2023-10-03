import { Provider } from '@loopback/core';
import { ForgotPasswordHandlerFn } from './types';
export declare class ForgotPasswordProvider implements Provider<ForgotPasswordHandlerFn> {
    value(): ForgotPasswordHandlerFn;
}
