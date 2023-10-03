import { InvocationResult, Provider, ValueOrPromise } from '@loopback/core';
import { RestExplorerConfig } from '@loopback/rest-explorer';
import { MiddlewareContext, Middleware } from '@loopback/express';
import { HttpAuthenticationVerifier } from '../types';
export declare class AuthenticateSwaggerMiddlewareInterceptor implements Provider<Middleware> {
    private readonly verifier;
    private readonly config;
    constructor(verifier: HttpAuthenticationVerifier, config: RestExplorerConfig);
    value(): (context: MiddlewareContext, next: () => any) => Promise<any>;
    intercept(context: MiddlewareContext, next: () => ValueOrPromise<InvocationResult>): Promise<any>;
    private decodeHeader;
    private isOpenAPISpecRequest;
    private isRequestContext;
}
