"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateSwaggerMiddlewareInterceptor = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const rest_explorer_1 = require("@loopback/rest-explorer");
const keys_1 = require("../keys");
let AuthenticateSwaggerMiddlewareInterceptor = class AuthenticateSwaggerMiddlewareInterceptor {
    constructor(verifier, config) {
        this.verifier = verifier;
        this.config = config;
    }
    value() {
        return this.intercept.bind(this);
    }
    async intercept(context, next) {
        let request, response;
        if (this.isRequestContext(context.parent)) {
            request = context.parent.request;
            response = context.parent.response;
        }
        if (request && response && this.isOpenAPISpecRequest(request)) {
            const { username, password } = this.decodeHeader(request);
            const verified = this.verifier(username, password);
            if (!verified) {
                response
                    .status(401 /* STATUS_CODE.UNAUTHORISED */)
                    .setHeader('WWW-Authenticate', 'Basic realm="Node"');
                response.end('Unauthorized');
                return null;
            }
        }
        return next();
    }
    decodeHeader(request) {
        var _a, _b;
        const header = (_a = request.headers.authorization) !== null && _a !== void 0 ? _a : ''; // get the auth header
        const token = (_b = header.split(/\s+/).pop()) !== null && _b !== void 0 ? _b : ''; // and the encoded auth token
        const auth = Buffer.from(token, 'base64').toString(); // convert from base64
        const parts = auth.split(/:/); // split on colon
        const username = parts.shift(); // username is first
        const password = parts.join(':');
        return {
            username,
            password,
        };
    }
    isOpenAPISpecRequest(request) {
        const swaggerUrl = `${this.config.path}/openapi.json`;
        if (request.url.includes(swaggerUrl)) {
            return true;
        }
        return false;
    }
    isRequestContext(context) {
        return !!(context.request &&
            context.response);
    }
};
AuthenticateSwaggerMiddlewareInterceptor = tslib_1.__decorate([
    (0, core_1.globalInterceptor)('auth', { tags: { name: 'AuthenticateSwaggerMiddleware' } }),
    tslib_1.__param(0, (0, core_1.inject)(keys_1.SwaggerAuthenticationBindings.VERIFIER)),
    tslib_1.__param(1, (0, core_1.inject)(rest_explorer_1.RestExplorerBindings.CONFIG)),
    tslib_1.__metadata("design:paramtypes", [Function, Object])
], AuthenticateSwaggerMiddlewareInterceptor);
exports.AuthenticateSwaggerMiddlewareInterceptor = AuthenticateSwaggerMiddlewareInterceptor;
//# sourceMappingURL=authenticate-swagger.middleware.js.map