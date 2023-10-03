import { Provider } from '@loopback/core';
import { CoreConfig } from '../../../types';
import { HttpAuthenticationVerifier } from '../types';
export declare class HttpAuthenticationVerifierProvider implements Provider<HttpAuthenticationVerifier> {
    private readonly coreConfig;
    constructor(coreConfig: CoreConfig);
    value(): HttpAuthenticationVerifier;
}
