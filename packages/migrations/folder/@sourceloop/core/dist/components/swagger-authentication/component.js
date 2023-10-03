"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerAuthenticationComponent = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const keys_1 = require("./keys");
const middlewares_1 = require("./middlewares");
const http_authentication_verifier_1 = require("./providers/http-authentication.verifier");
let SwaggerAuthenticationComponent = class SwaggerAuthenticationComponent {
    constructor(application) {
        this.application = application;
        this.bindings = [];
        this.providers = {
            [keys_1.SwaggerAuthenticationBindings.VERIFIER.key]: http_authentication_verifier_1.HttpAuthenticationVerifierProvider,
        };
        this.application.middleware(middlewares_1.AuthenticateSwaggerMiddlewareInterceptor);
    }
};
SwaggerAuthenticationComponent = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    tslib_1.__metadata("design:paramtypes", [rest_1.RestApplication])
], SwaggerAuthenticationComponent);
exports.SwaggerAuthenticationComponent = SwaggerAuthenticationComponent;
//# sourceMappingURL=component.js.map