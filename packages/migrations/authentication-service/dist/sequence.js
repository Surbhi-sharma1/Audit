"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySequence = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const core_1 = require("@sourceloop/core");
const lodash_1 = require("lodash");
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const SequenceActions = rest_1.RestBindings.SequenceActions;
const isJsonString = (str) => {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
};
let MySequence = class MySequence {
    constructor(findRoute, parseParams, invoke, send, reject, authenticateRequest, authenticateRequestClient, checkAuthorisation, logger, i18n) {
        this.findRoute = findRoute;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
        this.authenticateRequest = authenticateRequest;
        this.authenticateRequestClient = authenticateRequestClient;
        this.checkAuthorisation = checkAuthorisation;
        this.logger = logger;
        this.i18n = i18n;
        /**
         * Optional invoker for registered middleware in a chain.
         * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
         */
        this.invokeMiddleware = () => false;
        this.expressMiddlewares = [];
    }
    async handle(context) {
        var _a, _b;
        const requestTime = Date.now();
        try {
            const { request, response } = context;
            response.removeHeader('x-powered-by');
            this.logger.info(`Request ${request.method} ${request.url} started at ${requestTime.toString()}.
        Request Details
        Referer = ${request.headers.referer}
        User-Agent = ${request.headers['user-agent']}
        Remote Address = ${request.connection.remoteAddress}
        Remote Address (Proxy) = ${request.headers['x-forwarded-for']}`);
            if ((_a = this.expressMiddlewares) === null || _a === void 0 ? void 0 : _a.length) {
                const responseGenerated = await this.invokeMiddleware(context, this.expressMiddlewares);
                if (responseGenerated)
                    return;
            }
            const finished = await this.invokeMiddleware(context);
            if (finished)
                return;
            const route = this.findRoute(request);
            const args = await this.parseParams(request, route);
            await this.authenticateRequestClient(request);
            const authUser = await this.authenticateRequest(request, response);
            const isAccessAllowed = await this.checkAuthorisation(authUser === null || authUser === void 0 ? void 0 : authUser.permissions, request);
            if (!isAccessAllowed) {
                throw new rest_1.HttpErrors.Forbidden("NotAllowedAccess" /* AuthorizeErrorKeys.NotAllowedAccess */);
            }
            const result = await this.invoke(route, args);
            this.send(response, result);
        }
        catch (err) {
            this.logger.error(`Request ${context.request.method} ${context.request.url} errored out. Error :: ${JSON.stringify(err)} ${err}`);
            const error = this._rejectErrors(err);
            if (
            // sonarignore:start
            !(error.message &&
                [
                    "Token Invalid" /* AuthErrorKeys.TokenInvalid */,
                    "Token Expired" /* AuthErrorKeys.TokenExpired */,
                    'TokenExpired',
                ].includes(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                error.message.message))
            // sonarignore:end
            ) {
                if ((0, lodash_1.isString)(error.message)) {
                    error.message = this.i18n.__({
                        phrase: error.message,
                        locale: (_b = process.env.LOCALE) !== null && _b !== void 0 ? _b : 'en',
                    });
                }
                else {
                    error.message =
                        error.message || 'Some error occured. Please try again';
                }
            }
            this.reject(context, error);
        }
        finally {
            this.logger.info(`Request ${context.request.method} ${context.request.url} Completed in ${Date.now() - requestTime}ms`);
        }
    }
    // sonarignore:start
    /* eslint-disable @typescript-eslint/no-explicit-any */
    _rejectErrors(err) {
        var _a;
        // sonarignore:end
        if (!!err.table && !!err.detail) {
            if (err.code === '23505') {
                // Postgres unique index error
                return new rest_1.HttpErrors.Conflict(`Unique constraint violation error ! ${err.detail}`);
            }
            else if (err.code === '23503') {
                // Postgres foreign key error
                return new rest_1.HttpErrors.NotFound(`Related entity not found ! ${err.detail}`);
            }
            else if (err.code === '23502') {
                // Postgres not null constraint error
                return new rest_1.HttpErrors.NotFound(`Not null constraint violation error ! ${err.detail}`);
            }
            else {
                return err;
            }
        }
        else if (err.message &&
            isJsonString(err.message) &&
            JSON.parse(err.message).error) {
            return JSON.parse(err.message).error;
        }
        else if (((_a = err.message) === null || _a === void 0 ? void 0 : _a.message) &&
            isJsonString(err.message.message) &&
            JSON.parse(err.message.message).error) {
            return JSON.parse(err.message.message).error;
        }
        else if (err.name && err.name === 'PubNubError') {
            return new rest_1.HttpErrors.UnprocessableEntity(`Pubnub returned with error ! ${JSON.stringify(err)}`);
        }
        else {
            return err;
        }
    }
};
tslib_1.__decorate([
    (0, context_1.inject)(SequenceActions.INVOKE_MIDDLEWARE, { optional: true }),
    tslib_1.__metadata("design:type", Function)
], MySequence.prototype, "invokeMiddleware", void 0);
tslib_1.__decorate([
    (0, context_1.inject)(core_1.SFCoreBindings.EXPRESS_MIDDLEWARES, { optional: true }),
    tslib_1.__metadata("design:type", Array)
], MySequence.prototype, "expressMiddlewares", void 0);
MySequence = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(SequenceActions.FIND_ROUTE)),
    tslib_1.__param(1, (0, context_1.inject)(SequenceActions.PARSE_PARAMS)),
    tslib_1.__param(2, (0, context_1.inject)(SequenceActions.INVOKE_METHOD)),
    tslib_1.__param(3, (0, context_1.inject)(SequenceActions.SEND)),
    tslib_1.__param(4, (0, context_1.inject)(SequenceActions.REJECT)),
    tslib_1.__param(5, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.USER_AUTH_ACTION)),
    tslib_1.__param(6, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.CLIENT_AUTH_ACTION)),
    tslib_1.__param(7, (0, context_1.inject)(loopback4_authorization_1.AuthorizationBindings.AUTHORIZE_ACTION)),
    tslib_1.__param(8, (0, context_1.inject)(core_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(9, (0, context_1.inject)(core_1.SFCoreBindings.i18n)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Function, Function, Function, Function, Function, Object, Object])
], MySequence);
exports.MySequence = MySequence;
//# sourceMappingURL=sequence.js.map