"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleLoginController = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_1 = require("@sourceloop/core");
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const url_1 = require("url");
const providers_1 = require("../../providers");
const repositories_1 = require("../../repositories");
const client_auth_request_dto_1 = require("./models/client-auth-request.dto");
const token_response_dto_1 = require("./models/token-response.dto");
const queryGen = (from) => {
    return (req) => {
        return {
            state: `client_id=${req[from].client_id}`,
        };
    };
};
let AppleLoginController = class AppleLoginController {
    constructor(authClientRepository, logger, getAuthCode) {
        this.authClientRepository = authClientRepository;
        this.logger = logger;
        this.getAuthCode = getAuthCode;
    }
    postLoginViaApple(clientCreds) {
        //do nothing
    }
    async appleCallback(code, state, response, user) {
        var _a;
        const clientId = new url_1.URLSearchParams(state).get('client_id');
        if (!clientId || !user) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
        }
        const client = await this.authClientRepository.findOne({
            where: {
                clientId,
            },
        });
        if (!(client === null || client === void 0 ? void 0 : client.redirectUrl)) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
        }
        try {
            const token = await this.getAuthCode(client, user);
            const role = user.role;
            response.redirect(`${(_a = process.env.WEBAPP_URL) !== null && _a !== void 0 ? _a : ''}${client.redirectUrl}?code=${token}&role=${role}`);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
    }
};
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticateClient)("client-password" /* STRATEGY.CLIENT_PASSWORD */),
    (0, loopback4_authentication_1.authenticate)("Apple Oauth 2.0" /* STRATEGY.APPLE_OAUTH2 */, {
        accessType: 'offline',
        scope: ['name', 'email'],
        callbackURL: process.env.APPLE_AUTH_CALLBACK_URL,
        clientID: process.env.APPLE_AUTH_CLIENT_ID,
        teamID: process.env.APPLE_AUTH_TEAM_ID,
        keyID: process.env.APPLE_AUTH_KEY_ID,
        privateKeyLocation: process.env.APPLE_AUTH_PRIVATE_KEY_LOCATION,
    }, queryGen('body')),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/oauth-apple', {
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'POST Call for Apple based login',
                content: {},
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            [core_1.CONTENT_TYPE.FORM_URLENCODED]: {
                schema: (0, rest_1.getModelSchemaRef)(client_auth_request_dto_1.ClientAuthRequest),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [client_auth_request_dto_1.ClientAuthRequest]),
    tslib_1.__metadata("design:returntype", void 0)
], AppleLoginController.prototype, "postLoginViaApple", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("Apple Oauth 2.0" /* STRATEGY.APPLE_OAUTH2 */, {
        accessType: 'offline',
        scope: ['name', 'email'],
        callbackURL: process.env.APPLE_AUTH_CALLBACK_URL,
        clientID: process.env.APPLE_AUTH_CLIENT_ID,
        teamID: process.env.APPLE_AUTH_TEAM_ID,
        keyID: process.env.APPLE_AUTH_KEY_ID,
        privateKeyLocation: process.env.APPLE_AUTH_PRIVATE_KEY_LOCATION,
    }, queryGen('query')),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.get)('/auth/apple-oauth-redirect', {
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Apple Redirect Token Response',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: { [core_1.X_TS_TYPE]: token_response_dto_1.TokenResponse },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('code')),
    tslib_1.__param(1, rest_1.param.query.string('state')),
    tslib_1.__param(2, (0, context_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppleLoginController.prototype, "appleCallback", null);
AppleLoginController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.AuthClientRepository)),
    tslib_1.__param(1, (0, context_1.inject)(core_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(2, (0, context_1.inject)(providers_1.AuthCodeBindings.AUTH_CODE_GENERATOR_PROVIDER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.AuthClientRepository, Object, Function])
], AppleLoginController);
exports.AppleLoginController = AppleLoginController;
//# sourceMappingURL=apple-login.controller.js.map