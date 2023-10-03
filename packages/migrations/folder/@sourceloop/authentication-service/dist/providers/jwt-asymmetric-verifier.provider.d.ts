import { Provider } from '@loopback/core';
import { JWTVerifierFn } from './types';
export declare class JWTAsymmetricVerifierProvider<T> implements Provider<JWTVerifierFn<T>> {
    value(): JWTVerifierFn<T>;
}
