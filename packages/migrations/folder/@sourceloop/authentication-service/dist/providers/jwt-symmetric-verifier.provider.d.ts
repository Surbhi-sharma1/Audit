import { Provider } from '@loopback/core';
import { JWTVerifierFn } from './types';
export declare class JWTSymmetricVerifierProvider<T> implements Provider<JWTVerifierFn<T>> {
    value(): JWTVerifierFn<T>;
}
