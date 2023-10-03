"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationBindings = exports.AuthenticationBindings = exports.AuthServiceBindings = void 0;
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const core_2 = require("@sourceloop/core");
var AuthServiceBindings;
(function (AuthServiceBindings) {
    AuthServiceBindings.Config = core_1.BindingKey.create(`${core_2.BINDING_PREFIX}.auth.config`);
    AuthServiceBindings.MfaConfig = core_1.BindingKey.create(`${core_2.BINDING_PREFIX}.auth.mfa.config`);
    AuthServiceBindings.OtpConfig = core_1.BindingKey.create(`${core_2.BINDING_PREFIX}.auth.mfa.otp.config`);
    AuthServiceBindings.JWTPayloadProvider = core_1.BindingKey.create(`${core_2.BINDING_PREFIX}.auth.jwt.payload`);
    AuthServiceBindings.ForgotPasswordHandler = core_1.BindingKey.create(`${core_2.BINDING_PREFIX}.forgetpassword.handler.provider`);
    AuthServiceBindings.ActorIdKey = core_1.BindingKey.create(`${core_2.BINDING_PREFIX}.active.users.actorid`);
    AuthServiceBindings.MarkUserActivity = core_1.BindingKey.create(`${core_2.BINDING_PREFIX}.mark.users.activity`);
})(AuthServiceBindings = exports.AuthServiceBindings || (exports.AuthServiceBindings = {}));
var loopback4_authentication_1 = require("loopback4-authentication");
Object.defineProperty(exports, "AuthenticationBindings", { enumerable: true, get: function () { return loopback4_authentication_1.AuthenticationBindings; } });
var loopback4_authorization_1 = require("loopback4-authorization");
Object.defineProperty(exports, "AuthorizationBindings", { enumerable: true, get: function () { return loopback4_authorization_1.AuthorizationBindings; } });
//# sourceMappingURL=keys.js.map