/// <reference types="i18n" />
import { ExpressRequestHandler, FindRoute, InvokeMethod, InvokeMiddleware, ParseParams, Reject, RequestContext, Send, SequenceHandler } from '@loopback/rest';
import { AuthenticateFn } from 'loopback4-authentication';
import { AuthorizeFn } from 'loopback4-authorization';
import { IAuthUserWithPermissions, ILogger } from './components';
export declare class ServiceSequence implements SequenceHandler {
    protected findRoute: FindRoute;
    protected parseParams: ParseParams;
    protected invoke: InvokeMethod;
    send: Send;
    reject: Reject;
    logger: ILogger;
    protected authenticateRequest: AuthenticateFn<IAuthUserWithPermissions>;
    protected checkAuthorisation: AuthorizeFn;
    protected i18n: i18nAPI;
    /**
     * Optional invoker for registered middleware in a chain.
     * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
     */
    protected invokeMiddleware: InvokeMiddleware;
    protected expressMiddlewares: ExpressRequestHandler[];
    constructor(findRoute: FindRoute, parseParams: ParseParams, invoke: InvokeMethod, send: Send, reject: Reject, logger: ILogger, authenticateRequest: AuthenticateFn<IAuthUserWithPermissions>, checkAuthorisation: AuthorizeFn, i18n: i18nAPI);
    handle(context: RequestContext): Promise<void>;
    private _rejectErrors;
}
