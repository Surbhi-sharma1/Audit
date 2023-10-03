"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearerVerifierComponent = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const loopback4_authentication_1 = require("loopback4-authentication");
const logger_extension_1 = require("../logger-extension");
const keys_1 = require("./keys");
const models_1 = require("./models");
const facades_bearer_asym_token_verify_provider_1 = require("./providers/facades-bearer-asym-token-verify.provider");
const facades_bearer_token_verify_provider_1 = require("./providers/facades-bearer-token-verify.provider");
const services_bearer_asym_token_verifier_1 = require("./providers/services-bearer-asym-token-verifier");
const services_bearer_token_verify_provider_1 = require("./providers/services-bearer-token-verify.provider");
const repositories_1 = require("./repositories");
let BearerVerifierComponent = class BearerVerifierComponent {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.bindings = [];
        this.providers = {};
        this.repositories = [repositories_1.RevokedTokenRepository];
        this.models = [models_1.RevokedToken];
        if (this.config && this.config.type === keys_1.BearerVerifierType.service) {
            if (process.env.JWT_PUBLIC_KEY && process.env.JWT_PUBLIC_KEY !== '') {
                this.providers[loopback4_authentication_1.Strategies.Passport.BEARER_TOKEN_VERIFIER.key] =
                    services_bearer_asym_token_verifier_1.ServicesBearerAsymmetricTokenVerifyProvider;
            }
            else {
                this.providers[loopback4_authentication_1.Strategies.Passport.BEARER_TOKEN_VERIFIER.key] =
                    services_bearer_token_verify_provider_1.ServicesBearerTokenVerifyProvider;
            }
        }
        else if (this.config && this.config.type === keys_1.BearerVerifierType.facade) {
            if (process.env.JWT_PUBLIC_KEY && process.env.JWT_PUBLIC_KEY !== '') {
                this.providers[loopback4_authentication_1.Strategies.Passport.BEARER_TOKEN_VERIFIER.key] =
                    facades_bearer_asym_token_verify_provider_1.FacadesBearerAsymmetricTokenVerifyProvider;
            }
            else {
                this.providers[loopback4_authentication_1.Strategies.Passport.BEARER_TOKEN_VERIFIER.key] =
                    facades_bearer_token_verify_provider_1.FacadesBearerTokenVerifyProvider;
            }
        }
        else {
            this.logger.error('Invalid BearerVerifierType specified !');
        }
    }
};
BearerVerifierComponent = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(keys_1.BearerVerifierBindings.Config)),
    tslib_1.__param(1, (0, core_1.inject)(logger_extension_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], BearerVerifierComponent);
exports.BearerVerifierComponent = BearerVerifierComponent;
//# sourceMappingURL=component.js.map