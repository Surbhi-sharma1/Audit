"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationServiceComponent = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const core_2 = require("@sourceloop/core");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const controllers_1 = require("./controllers");
const keys_1 = require("./keys");
const models_1 = require("./models");
const auth_1 = require("./modules/auth");
const keycloak_verify_provider_1 = require("./modules/auth/providers/keycloak-verify.provider");
const providers_1 = require("./providers");
const auth_code_generator_provider_1 = require("./providers/auth-code-generator.provider");
const bearer_verify_provider_1 = require("./providers/bearer-verify.provider");
const code_reader_provider_1 = require("./providers/code-reader.provider");
const keycloak_signup_provider_1 = require("./providers/keycloak-signup.provider");
const local_presignup_provider_1 = require("./providers/local-presignup.provider");
const local_signup_provider_1 = require("./providers/local-signup.provider");
const mfa_provider_1 = require("./providers/mfa.provider");
const repositories_1 = require("./repositories");
const sequence_1 = require("./sequence");
const services_1 = require("./services");
let AuthenticationServiceComponent = class AuthenticationServiceComponent {
    constructor(application, mfaConfig, otpConfig, authConfig, config) {
        var _a, _b, _c, _d;
        this.application = application;
        this.mfaConfig = mfaConfig;
        this.otpConfig = otpConfig;
        this.authConfig = authConfig;
        this.config = config;
        this.providers = {};
        this.bindings = [];
        this.bindings = [];
        this.providers = {};
        // Mount core component
        this.application.component(core_2.CoreComponent);
        if (+((_a = process.env.AZURE_AUTH_ENABLED) !== null && _a !== void 0 ? _a : 0)) {
            const expressMiddlewares = (_b = this.application.getSync(core_2.SFCoreBindings.EXPRESS_MIDDLEWARES)) !== null && _b !== void 0 ? _b : [];
            expressMiddlewares.push((0, cookie_parser_1.default)());
            expressMiddlewares.push(body_parser_1.default.urlencoded({ extended: true }));
            this.application
                .bind(core_2.SFCoreBindings.EXPRESS_MIDDLEWARES)
                .to(expressMiddlewares);
        }
        // Mount authentication component
        this.setupAuthenticationComponent((_c = this.config) === null || _c === void 0 ? void 0 : _c.secureClient);
        this.setupMultiFactorAuthentication();
        // Mount authorization component
        this.setupAuthorizationComponent();
        this.application.api({
            openapi: '3.0.0',
            info: {
                title: 'Authentication Service',
                version: '1.0.0',
            },
            paths: {},
            components: {
                securitySchemes: core_2.SECURITY_SCHEME_SPEC,
            },
            servers: [{ url: '/' }],
        });
        // Mount default sequence if needed
        if (!((_d = this.authConfig) === null || _d === void 0 ? void 0 : _d.useCustomSequence)) {
            // Mount default sequence if needed
            this.setupSequence();
        }
        this.repositories = repositories_1.repositories;
        this.application
            .bind('services.LoginHelperService')
            .toClass(services_1.LoginHelperService);
        this.application.bind('services.otpService').toClass(services_1.OtpService);
        this.application.bind(keys_1.AuthServiceBindings.ActorIdKey).to('userId');
        this.application
            .bind(keys_1.AuthServiceBindings.MarkUserActivity)
            .to({ markUserActivity: false });
        this.models = models_1.models;
        this.controllers = controllers_1.controllers;
    }
    /**
     * Setup ServiceSequence by default if no other sequnce provided
     *
     * @param bindings Binding array
     */
    setupSequence() {
        this.application.sequence(sequence_1.MySequence);
    }
    setupAuthenticationComponent(secureClient = false) {
        // Add authentication component
        this.application.component(loopback4_authentication_1.AuthenticationComponent);
        // Customize authentication verify handlers
        if (!secureClient) {
            this.providers[loopback4_authentication_1.Strategies.Passport.OAUTH2_CLIENT_PASSWORD_VERIFIER.key] =
                auth_1.ClientPasswordVerifyProvider;
            this.providers[loopback4_authentication_1.Strategies.Passport.RESOURCE_OWNER_PASSWORD_VERIFIER.key] =
                auth_1.ResourceOwnerVerifyProvider;
        }
        else {
            this.providers[loopback4_authentication_1.Strategies.Passport.OAUTH2_CLIENT_PASSWORD_VERIFIER.key] =
                auth_1.SecureClientPasswordVerifyProvider;
            this.providers[loopback4_authentication_1.Strategies.Passport.RESOURCE_OWNER_PASSWORD_VERIFIER.key] =
                auth_1.SecureResourceOwnerVerifyProvider;
        }
        this.providers[loopback4_authentication_1.Strategies.Passport.LOCAL_PASSWORD_VERIFIER.key] =
            auth_1.LocalPasswordVerifyProvider;
        this.providers[loopback4_authentication_1.Strategies.Passport.BEARER_TOKEN_VERIFIER.key] =
            auth_1.BearerTokenVerifyProvider;
        this.providers[loopback4_authentication_1.Strategies.Passport.GOOGLE_OAUTH2_VERIFIER.key] =
            auth_1.GoogleOauth2VerifyProvider;
        this.providers[loopback4_authentication_1.Strategies.Passport.SAML_VERIFIER.key] = auth_1.SamlVerifyProvider;
        this.providers[loopback4_authentication_1.Strategies.Passport.APPLE_OAUTH2_VERIFIER.key] =
            auth_1.AppleOauth2VerifyProvider;
        this.providers[loopback4_authentication_1.Strategies.Passport.FACEBOOK_OAUTH2_VERIFIER.key] =
            auth_1.FacebookOauth2VerifyProvider;
        this.providers[loopback4_authentication_1.Strategies.Passport.COGNITO_OAUTH2_VERIFIER.key] =
            auth_1.CognitoOauth2VerifyProvider;
        this.providers[loopback4_authentication_1.Strategies.Passport.KEYCLOAK_VERIFIER.key] =
            keycloak_verify_provider_1.KeycloakVerifyProvider;
        this.providers[providers_1.SignUpBindings.KEYCLOAK_SIGN_UP_PROVIDER.key] =
            keycloak_signup_provider_1.KeyCloakSignupProvider;
        this.providers[providers_1.SignUpBindings.GOOGLE_SIGN_UP_PROVIDER.key] =
            providers_1.GoogleOauth2SignupProvider;
        this.providers[providers_1.SignUpBindings.SAML_SIGN_UP_PROVIDER.key] =
            providers_1.SamlSignupProvider;
        this.providers[providers_1.SignUpBindings.INSTAGRAM_SIGN_UP_PROVIDER.key] =
            providers_1.InstagramOauth2SignupProvider;
        this.providers[providers_1.SignUpBindings.APPLE_SIGN_UP_PROVIDER.key] =
            providers_1.AppleOauth2SignupProvider;
        this.providers[providers_1.SignUpBindings.FACEBOOK_SIGN_UP_PROVIDER.key] =
            providers_1.FacebookOauth2SignupProvider;
        this.providers[providers_1.SignUpBindings.COGNITO_SIGN_UP_PROVIDER.key] =
            providers_1.CognitoOauth2SignupProvider;
        this.providers[providers_1.SignUpBindings.LOCAL_SIGNUP_PROVIDER.key] =
            local_signup_provider_1.LocalSignupProvider;
        this.providers[providers_1.SignUpBindings.PRE_LOCAL_SIGNUP_PROVIDER.key] =
            local_presignup_provider_1.LocalPreSignupProvider;
        this.providers[providers_1.SignUpBindings.SIGNUP_HANDLER_PROVIDER.key] =
            providers_1.SignupTokenHandlerProvider;
        this.providers[providers_1.VerifyBindings.KEYCLOAK_PRE_VERIFY_PROVIDER.key] =
            providers_1.KeyCloakPreVerifyProvider;
        this.providers[providers_1.VerifyBindings.KEYCLOAK_POST_VERIFY_PROVIDER.key] =
            providers_1.KeyCloakPostVerifyProvider;
        this.providers[providers_1.VerifyBindings.GOOGLE_PRE_VERIFY_PROVIDER.key] =
            providers_1.GooglePreVerifyProvider;
        this.providers[providers_1.VerifyBindings.GOOGLE_POST_VERIFY_PROVIDER.key] =
            providers_1.GooglePostVerifyProvider;
        this.providers[providers_1.VerifyBindings.SAML_PRE_VERIFY_PROVIDER.key] =
            providers_1.SamlPreVerifyProvider;
        this.providers[providers_1.VerifyBindings.SAML_POST_VERIFY_PROVIDER.key] =
            providers_1.SamlPostVerifyProvider;
        this.providers[providers_1.VerifyBindings.INSTAGRAM_PRE_VERIFY_PROVIDER.key] =
            providers_1.InstagramPreVerifyProvider;
        this.providers[providers_1.VerifyBindings.INSTAGRAM_POST_VERIFY_PROVIDER.key] =
            providers_1.InstagramPostVerifyProvider;
        this.providers[providers_1.VerifyBindings.APPLE_PRE_VERIFY_PROVIDER.key] =
            providers_1.ApplePreVerifyProvider;
        this.providers[providers_1.VerifyBindings.APPLE_POST_VERIFY_PROVIDER.key] =
            providers_1.ApplePostVerifyProvider;
        this.providers[providers_1.VerifyBindings.FACEBOOK_PRE_VERIFY_PROVIDER.key] =
            providers_1.FacebookPreVerifyProvider;
        this.providers[providers_1.VerifyBindings.FACEBOOK_POST_VERIFY_PROVIDER.key] =
            providers_1.FacebookPostVerifyProvider;
        this.providers[providers_1.VerifyBindings.COGNITO_PRE_VERIFY_PROVIDER.key] =
            providers_1.CognitoPreVerifyProvider;
        this.providers[providers_1.VerifyBindings.COGNITO_POST_VERIFY_PROVIDER.key] =
            providers_1.CognitoPostVerifyProvider;
        this.providers[providers_1.VerifyBindings.BEARER_SIGNUP_VERIFY_PROVIDER.key] =
            bearer_verify_provider_1.SignupBearerVerifyProvider;
        this.providers[providers_1.AuthCodeBindings.CODEREADER_PROVIDER.key] =
            code_reader_provider_1.OauthCodeReaderProvider;
        this.providers[providers_1.AuthCodeBindings.CODEWRITER_PROVIDER.key] =
            providers_1.CodeWriterProvider;
        this.providers[providers_1.AuthCodeBindings.AUTH_CODE_GENERATOR_PROVIDER.key] =
            auth_code_generator_provider_1.AuthCodeGeneratorProvider;
        this.application.bind(loopback4_authentication_1.AuthenticationBindings.USER_MODEL.key).to(auth_1.AuthUser);
        if (process.env.JWT_PRIVATE_KEY && process.env.JWT_PRIVATE_KEY !== '') {
            this.providers[providers_1.AuthCodeBindings.JWT_SIGNER.key] =
                providers_1.JWTAsymmetricSignerProvider;
        }
        else {
            this.providers[providers_1.AuthCodeBindings.JWT_SIGNER.key] =
                providers_1.JWTSymmetricSignerProvider;
        }
        if (process.env.JWT_PRIVATE_KEY && process.env.JWT_PRIVATE_KEY !== '') {
            this.providers[providers_1.AuthCodeBindings.JWT_VERIFIER.key] =
                providers_1.JWTAsymmetricVerifierProvider;
        }
        else {
            this.providers[providers_1.AuthCodeBindings.JWT_VERIFIER.key] =
                providers_1.JWTSymmetricVerifierProvider;
        }
        this.providers[keys_1.AuthServiceBindings.JWTPayloadProvider.key] =
            providers_1.JwtPayloadProvider;
        this.providers[keys_1.AuthServiceBindings.ForgotPasswordHandler.key] =
            providers_1.ForgotPasswordProvider;
        this.providers[loopback4_authentication_1.Strategies.Passport.AZURE_AD_VERIFIER.key] =
            auth_1.AzureAdVerifyProvider;
        this.providers[providers_1.SignUpBindings.AZURE_AD_SIGN_UP_PROVIDER.key] =
            providers_1.AzureAdSignupProvider;
        this.providers[providers_1.VerifyBindings.AZURE_AD_PRE_VERIFY_PROVIDER.key] =
            providers_1.AzurePreVerifyProvider;
        this.providers[providers_1.VerifyBindings.AZURE_AD_POST_VERIFY_PROVIDER.key] =
            providers_1.AzurePostVerifyProvider;
    }
    setupAuthorizationComponent() {
        // Add authorization component
        this.application.bind(loopback4_authorization_1.AuthorizationBindings.CONFIG).to({
            allowAlwaysPaths: ['/explorer'],
        });
        this.application.component(loopback4_authorization_1.AuthorizationComponent);
    }
    setupMultiFactorAuthentication() {
        var _a, _b, _c;
        this.providers[providers_1.VerifyBindings.MFA_PROVIDER.key] = mfa_provider_1.MfaProvider;
        if (((_a = this.mfaConfig) === null || _a === void 0 ? void 0 : _a.secondFactor) === "otp" /* STRATEGY.OTP */) {
            if (((_b = this.otpConfig) === null || _b === void 0 ? void 0 : _b.method) === "OTP" /* OtpMethodType.OTP */) {
                this.providers[providers_1.VerifyBindings.OTP_GENERATE_PROVIDER.key] =
                    providers_1.OtpGenerateProvider;
                this.providers[providers_1.VerifyBindings.OTP_SENDER_PROVIDER.key] =
                    providers_1.OtpSenderProvider;
                this.providers[providers_1.VerifyBindings.OTP_PROVIDER.key] = providers_1.OtpProvider;
                this.providers[loopback4_authentication_1.Strategies.Passport.OTP_VERIFIER.key] =
                    auth_1.OtpVerifyProvider;
            }
            else if (((_c = this.otpConfig) === null || _c === void 0 ? void 0 : _c.method) === "Google Authenticator App" /* OtpMethodType.GOOGLE_AUTHENTICATOR */) {
                this.providers[loopback4_authentication_1.Strategies.Passport.OTP_VERIFIER.key] =
                    auth_1.GoogleAuthenticatorVerifyProvider;
            }
            else {
                // do nothing
            }
        }
    }
};
AuthenticationServiceComponent = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    tslib_1.__param(1, (0, core_1.inject)(keys_1.AuthServiceBindings.MfaConfig, { optional: true })),
    tslib_1.__param(2, (0, core_1.inject)(keys_1.AuthServiceBindings.OtpConfig, { optional: true })),
    tslib_1.__param(3, (0, core_1.inject)(keys_1.AuthServiceBindings.Config, { optional: true })),
    tslib_1.__param(4, (0, core_1.inject)(loopback4_authentication_1.AuthenticationBindings.CONFIG, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [rest_1.RestApplication, Object, Object, Object, Object])
], AuthenticationServiceComponent);
exports.AuthenticationServiceComponent = AuthenticationServiceComponent;
//# sourceMappingURL=component.js.map