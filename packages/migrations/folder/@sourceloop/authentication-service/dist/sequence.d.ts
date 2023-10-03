/// <reference types="i18n" />
import { ExpressRequestHandler, FindRoute, InvokeMethod, InvokeMiddleware, ParseParams, Reject, RequestContext, Send, SequenceHandler } from '@loopback/rest';
import { ILogger } from '@sourceloop/core';
import { AuthenticateFn } from 'loopback4-authentication';
import { AuthorizeFn } from 'loopback4-authorization';
import { AuthClient } from './models';
import { AuthUser } from './modules/auth';
export declare class MySequence implements SequenceHandler {
    protected findRoute: FindRoute;
    protected parseParams: ParseParams;
    protected invoke: InvokeMethod;
    send: Send;
    reject: Reject;
    protected authenticateRequest: AuthenticateFn<AuthUser>;
    protected authenticateRequestClient: AuthenticateFn<AuthClient>;
    protected checkAuthorisation: AuthorizeFn;
    logger: ILogger;
    protected i18n: i18nAPI;
    /**
     * Optional invoker for registered middleware in a chain.
     * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
     */
    protected invokeMiddleware: InvokeMiddleware;
    protected expressMiddlewares: ExpressRequestHandler[];
    constructor(findRoute: FindRoute, parseParams: ParseParams, invoke: InvokeMethod, send: Send, reject: Reject, authenticateRequest: AuthenticateFn<AuthUser>, authenticateRequestClient: AuthenticateFn<AuthClient>, checkAuthorisation: AuthorizeFn, logger: ILogger, i18n: i18nAPI);
    handle(context: RequestContext): Promise<void>;
    private _rejectErrors;
}
