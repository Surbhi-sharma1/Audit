"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCodeBindings = exports.VerifyBindings = exports.SignUpBindings = void 0;
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
var SignUpBindings;
(function (SignUpBindings) {
    SignUpBindings.GOOGLE_SIGN_UP_PROVIDER = core_1.BindingKey.create('sf.google.signup.provider');
    SignUpBindings.INSTAGRAM_SIGN_UP_PROVIDER = core_1.BindingKey.create('sf.instagram.signup.provider');
    SignUpBindings.APPLE_SIGN_UP_PROVIDER = core_1.BindingKey.create('sf.apple.signup.provider');
    SignUpBindings.FACEBOOK_SIGN_UP_PROVIDER = core_1.BindingKey.create('sf.facebook.signup.provider');
    SignUpBindings.KEYCLOAK_SIGN_UP_PROVIDER = core_1.BindingKey.create('sf.keycloak.signup.provider');
    SignUpBindings.AZURE_AD_SIGN_UP_PROVIDER = core_1.BindingKey.create('sf.azuread.signup.provider');
    SignUpBindings.COGNITO_SIGN_UP_PROVIDER = core_1.BindingKey.create('sf.cognito.signup.provider');
    SignUpBindings.SAML_SIGN_UP_PROVIDER = core_1.BindingKey.create('sf.saml.signup.provider');
    SignUpBindings.PRE_LOCAL_SIGNUP_PROVIDER = core_1.BindingKey.create(`sf.local.presignup.provider`);
    SignUpBindings.LOCAL_SIGNUP_PROVIDER = core_1.BindingKey.create(`sf.local.signup.provider`);
    SignUpBindings.SIGNUP_HANDLER_PROVIDER = core_1.BindingKey.create(`sf.local.signup.handler.provider`);
})(SignUpBindings = exports.SignUpBindings || (exports.SignUpBindings = {}));
var VerifyBindings;
(function (VerifyBindings) {
    VerifyBindings.GOOGLE_PRE_VERIFY_PROVIDER = core_1.BindingKey.create('sf.google.preverify.provider');
    VerifyBindings.GOOGLE_POST_VERIFY_PROVIDER = core_1.BindingKey.create('sf.google.postverify.provider');
    VerifyBindings.INSTAGRAM_POST_VERIFY_PROVIDER = core_1.BindingKey.create('sf.instgram.postverify.provider');
    VerifyBindings.INSTAGRAM_PRE_VERIFY_PROVIDER = core_1.BindingKey.create('sf.instagram.preverify.provider');
    VerifyBindings.APPLE_PRE_VERIFY_PROVIDER = core_1.BindingKey.create('sf.apple.preverify.provider');
    VerifyBindings.APPLE_POST_VERIFY_PROVIDER = core_1.BindingKey.create('sf.apple.postverify.provider');
    VerifyBindings.FACEBOOK_POST_VERIFY_PROVIDER = core_1.BindingKey.create('sf.facebook.postverify.provider');
    VerifyBindings.FACEBOOK_PRE_VERIFY_PROVIDER = core_1.BindingKey.create('sf.facebook.preverify.provider');
    VerifyBindings.KEYCLOAK_PRE_VERIFY_PROVIDER = core_1.BindingKey.create('sf.keycloak.preverify.provider');
    VerifyBindings.KEYCLOAK_POST_VERIFY_PROVIDER = core_1.BindingKey.create('sf.keycloak.postverify.provider');
    VerifyBindings.COGNITO_PRE_VERIFY_PROVIDER = core_1.BindingKey.create('sf.cognito.preverify.provider');
    VerifyBindings.COGNITO_POST_VERIFY_PROVIDER = core_1.BindingKey.create('sf.cognito.postverify.provider');
    VerifyBindings.SAML_PRE_VERIFY_PROVIDER = core_1.BindingKey.create('sf.saml.preverify.provider');
    VerifyBindings.SAML_POST_VERIFY_PROVIDER = core_1.BindingKey.create('sf.saml.postverify.provider');
    VerifyBindings.OTP_PROVIDER = core_1.BindingKey.create('sf.otp.provider');
    VerifyBindings.OTP_GENERATE_PROVIDER = core_1.BindingKey.create('sf.otp.generate.provider');
    VerifyBindings.OTP_SENDER_PROVIDER = core_1.BindingKey.create('sf.otp.sender.provider');
    VerifyBindings.MFA_PROVIDER = core_1.BindingKey.create('sf.mfa.check.provider');
    VerifyBindings.BEARER_SIGNUP_VERIFY_PROVIDER = core_1.BindingKey.create(`sf.bearer.signupverify.provider`);
    VerifyBindings.AZURE_AD_PRE_VERIFY_PROVIDER = core_1.BindingKey.create('sf.azure.preverify.provider');
    VerifyBindings.AZURE_AD_POST_VERIFY_PROVIDER = core_1.BindingKey.create('sf.azure.postverify.provider');
})(VerifyBindings = exports.VerifyBindings || (exports.VerifyBindings = {}));
var AuthCodeBindings;
(function (AuthCodeBindings) {
    AuthCodeBindings.CODEWRITER_PROVIDER = core_1.BindingKey.create('sf.auth.codewriter.provider');
    AuthCodeBindings.CODEREADER_PROVIDER = core_1.BindingKey.create('sf.auth.codereader.provider');
    AuthCodeBindings.AUTH_CODE_GENERATOR_PROVIDER = core_1.BindingKey.create('sf.auth-code.generator.provider');
    AuthCodeBindings.JWT_SIGNER = core_1.BindingKey.create('sf.auth-token.generator.provider');
    AuthCodeBindings.JWT_VERIFIER = core_1.BindingKey.create('sf.auth-payload.provider');
})(AuthCodeBindings = exports.AuthCodeBindings || (exports.AuthCodeBindings = {}));
//# sourceMappingURL=keys.js.map