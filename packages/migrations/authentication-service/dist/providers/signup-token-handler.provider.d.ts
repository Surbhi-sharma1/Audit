import { Provider } from '@loopback/core';
import { SignupTokenHandlerFn } from './types';
export declare class SignupTokenHandlerProvider implements Provider<SignupTokenHandlerFn> {
    value(): SignupTokenHandlerFn;
}
