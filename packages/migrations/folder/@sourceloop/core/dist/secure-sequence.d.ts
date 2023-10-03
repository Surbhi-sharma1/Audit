/// <reference types="i18n" />
import { ExpressRequestHandler, FindRoute, InvokeMethod, InvokeMiddleware, ParseParams, Reject, RequestContext, Send, SequenceHandler } from '@loopback/rest';
import { AuthenticateFn, IAuthClient } from 'loopback4-authentication';
import { AuthorizeFn } from 'loopback4-authorization';
import { HelmetAction } from 'loopback4-helmet';
import { RateLimitAction } from 'loopback4-ratelimiter';
import { IAuthUserWithPermissions, ILogger } from './components';
export declare class SecureSequence implements SequenceHandler {
    protected findRoute: FindRoute;
    protected parseParams: ParseParams;
    protected invoke: InvokeMethod;
    send: Send;
    reject: Reject;
    logger: ILogger;
    protected authenticateRequest: AuthenticateFn<IAuthUserWithPermissions>;
    protected authenticateClientRequest: AuthenticateFn<IAuthClient>;
    protected checkAuthorisation: AuthorizeFn;
    protected helmetAction: HelmetAction;
    protected rateLimitAction: RateLimitAction;
    protected i18n: i18nAPI;
    private readonly rateLimitConfig?;
    private readonly helmetConfig?;
    /**
     * Optional invoker for registered middleware in a chain.
     * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
     */
    protected invokeMiddleware: InvokeMiddleware;
    protected expressMiddlewares: ExpressRequestHandler[];
    constructor(findRoute: FindRoute, parseParams: ParseParams, invoke: InvokeMethod, send: Send, reject: Reject, logger: ILogger, authenticateRequest: AuthenticateFn<IAuthUserWithPermissions>, authenticateClientRequest: AuthenticateFn<IAuthClient>, checkAuthorisation: AuthorizeFn, helmetAction: HelmetAction, rateLimitAction: RateLimitAction, i18n: i18nAPI, // sonarignore:end
    rateLimitConfig?: object | undefined, helmetConfig?: object | undefined);
    handle(context: RequestContext): Promise<void>;
    private _handleErrorMessage;
    private _rejectErrors;
}
