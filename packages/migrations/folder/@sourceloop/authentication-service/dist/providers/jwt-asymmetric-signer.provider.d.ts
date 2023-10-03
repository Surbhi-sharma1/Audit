/// <reference types="node" />
import { Provider } from '@loopback/core';
import { JWTSignerFn } from './types';
export declare class JWTAsymmetricSignerProvider<T extends string | object | Buffer> implements Provider<JWTSignerFn<T>> {
    value(): JWTSignerFn<T>;
}
