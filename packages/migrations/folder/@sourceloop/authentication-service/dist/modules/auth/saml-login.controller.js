"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamlLoginController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_2 = require("@sourceloop/core");
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const providers_1 = require("../../providers");
const repositories_1 = require("../../repositories");
const client_auth_request_dto_1 = require("./models/client-auth-request.dto");
const token_response_dto_1 = require("./models/token-response.dto");
const queryGen = (from) => {
    return (req) => {
        return {
            customState: `client_id=${req[from].client_id}`,
        };
    };
};
let SamlLoginController = class SamlLoginController {
    constructor(authClientRepository, logger, getAuthCode) {
        this.authClientRepository = authClientRepository;
        this.logger = logger;
        this.getAuthCode = getAuthCode;
    }
    async postLoginViaSaml(clientCreds) {
        //do nothing
    }
    async samlCallback(code, //NOSONAR
    state, sessionState, //NOSONAR
    response, user) {
        const clientId = new URLSearchParams(state).get('client_id');
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
            response.redirect(`${client.redirectUrl}?code=${token}`);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
    }
};
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticateClient)("client-password" /* STRATEGY.CLIENT_PASSWORD */),
    (0, loopback4_authentication_1.authenticate)("saml" /* STRATEGY.SAML */, {
        accessType: 'offline',
        scope: ['profile', 'email'],
        authorizationURL: process.env.SAML_URL,
        callbackURL: process.env.SAML_CALLBACK_URL,
        clientID: process.env.SAML_CLIENT_ID,
        clientSecret: process.env.SAML_CLIENT_SECRET,
        tokenURL: process.env.SAML_TOKEN_URL,
    }, queryGen('body')),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/saml', {
        description: 'POST Call for saml based login',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Saml Token Response',
                content: {
                    [core_2.CONTENT_TYPE.JSON]: {
                        schema: { [core_2.X_TS_TYPE]: token_response_dto_1.TokenResponse },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            [core_2.CONTENT_TYPE.FORM_URLENCODED]: {
                schema: (0, rest_1.getModelSchemaRef)(client_auth_request_dto_1.ClientAuthRequest),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [client_auth_request_dto_1.ClientAuthRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], SamlLoginController.prototype, "postLoginViaSaml", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("saml" /* STRATEGY.SAML */, {
        accessType: 'offline',
        scope: ['profile', 'email'],
        authorizationURL: process.env.SAML_URL,
        callbackURL: process.env.SAML_CALLBACK_URL,
        clientID: process.env.SAML_CLIENT_ID,
        clientSecret: process.env.SAML_CLIENT_SECRET,
        tokenURL: process.env.SAML_TOKEN_URL,
    }, queryGen('query')),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.get)('/auth/saml-auth-redirect', {
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Saml Redirect Token Response',
                content: {
                    [core_2.CONTENT_TYPE.JSON]: {
                        schema: { [core_2.X_TS_TYPE]: token_response_dto_1.TokenResponse },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('code')),
    tslib_1.__param(1, rest_1.param.query.string('state')),
    tslib_1.__param(2, rest_1.param.query.string('session_state')),
    tslib_1.__param(3, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(4, (0, core_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SamlLoginController.prototype, "samlCallback", null);
SamlLoginController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.AuthClientRepository)),
    tslib_1.__param(1, (0, core_1.inject)(core_2.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(2, (0, core_1.inject)(providers_1.AuthCodeBindings.AUTH_CODE_GENERATOR_PROVIDER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.AuthClientRepository, Object, Function])
], SamlLoginController);
exports.SamlLoginController = SamlLoginController;
//# sourceMappingURL=saml-login.controller.js.map