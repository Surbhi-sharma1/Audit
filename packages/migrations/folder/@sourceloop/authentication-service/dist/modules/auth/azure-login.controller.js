"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureLoginController = void 0;
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
const offSet = 10;
const clockSkew = 300;
const nonceTime = 3600;
const nonceCount = 10;
let AzureLoginController = class AzureLoginController {
    constructor(authClientRepository, logger, getAuthCode) {
        this.authClientRepository = authClientRepository;
        this.logger = logger;
        this.getAuthCode = getAuthCode;
    }
    async getLoginViaAzure(clientId, //NOSONAR
    clientSecret) {
        //do nothing
    }
    async postLoginViaAzure(clientCreds) {
        //do nothing
    }
    async azureCallback(code, //NOSONAR
    state, sessionState, //NOSONAR
    response, user) {
        var _a;
        const clientId = state.substring(state.indexOf('client_id=') + offSet);
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
    (0, loopback4_authentication_1.authenticate)("Azure AD" /* STRATEGY.AZURE_AD */, {
        scope: ['profile', 'email', 'openid', 'offline_access'],
        identityMetadata: process.env.AZURE_IDENTITY_METADATA,
        clientID: process.env.AZURE_AUTH_CLIENT_ID,
        responseType: 'code',
        responseMode: 'query',
        redirectUrl: process.env.AZURE_AUTH_REDIRECT_URL,
        clientSecret: process.env.AZURE_AUTH_CLIENT_SECRET,
        allowHttpForRedirectUrl: !!+((_a = process.env.AZURE_AUTH_ALLOW_HTTP_REDIRECT) !== null && _a !== void 0 ? _a : 1),
        passReqToCallback: !!+((_b = process.env.AZURE_AUTH_PASS_REQ_CALLBACK) !== null && _b !== void 0 ? _b : 0),
        validateIssuer: !!+((_c = process.env.AZURE_AUTH_VALIDATE_ISSUER) !== null && _c !== void 0 ? _c : 1),
        useCookieInsteadOfSession: !!+((_d = process.env.AZURE_AUTH_COOKIE_INSTEAD_SESSION) !== null && _d !== void 0 ? _d : 1),
        cookieEncryptionKeys: [
            {
                key: process.env.AZURE_AUTH_COOKIE_KEY,
                iv: process.env.AZURE_AUTH_COOKIE_IV,
            },
        ],
        isB2c: !!+((_e = process.env.AZURE_AUTH_B2C_TENANT) !== null && _e !== void 0 ? _e : 0),
        clockSkew: +((_f = process.env.AZURE_AUTH_CLOCK_SKEW) !== null && _f !== void 0 ? _f : clockSkew),
        loggingLevel: process.env.AZURE_AUTH_LOG_LEVEL,
        loggingNoPII: !!+((_g = process.env.AZURE_AUTH_LOG_PII) !== null && _g !== void 0 ? _g : 1),
        nonceLifetime: +((_h = process.env.AZURE_AUTH_NONCE_TIME) !== null && _h !== void 0 ? _h : nonceTime),
        nonceMaxAmount: +((_j = process.env.AZURE_AUTH_NONCE_COUNT) !== null && _j !== void 0 ? _j : nonceCount),
        issuer: process.env.AZURE_AUTH_ISSUER,
        cookieSameSite: !!+((_k = process.env.AZURE_AUTH_COOKIE_SAME_SITE) !== null && _k !== void 0 ? _k : 0),
    }, queryGen('query')),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    rest_1.oas.deprecated(),
    (0, rest_1.get)('/auth/azure', {
        description: 'POST Call for azure based login',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Azure Token Response',
                content: {
                    [core_2.CONTENT_TYPE.JSON]: {
                        schema: { [core_2.X_TS_TYPE]: token_response_dto_1.TokenResponse },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('client_id')),
    tslib_1.__param(1, rest_1.param.query.string('client_secret')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AzureLoginController.prototype, "getLoginViaAzure", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticateClient)("client-password" /* STRATEGY.CLIENT_PASSWORD */),
    (0, loopback4_authentication_1.authenticate)("Azure AD" /* STRATEGY.AZURE_AD */, {
        scope: ['profile', 'email', 'openid', 'offline_access'],
        identityMetadata: process.env.AZURE_IDENTITY_METADATA,
        clientID: process.env.AZURE_AUTH_CLIENT_ID,
        responseType: 'code',
        responseMode: 'query',
        redirectUrl: process.env.AZURE_AUTH_REDIRECT_URL,
        clientSecret: process.env.AZURE_AUTH_CLIENT_SECRET,
        allowHttpForRedirectUrl: !!+((_l = process.env.AZURE_AUTH_ALLOW_HTTP_REDIRECT) !== null && _l !== void 0 ? _l : 1),
        passReqToCallback: !!+((_m = process.env.AZURE_AUTH_PASS_REQ_CALLBACK) !== null && _m !== void 0 ? _m : 0),
        validateIssuer: !!+((_o = process.env.AZURE_AUTH_VALIDATE_ISSUER) !== null && _o !== void 0 ? _o : 1),
        useCookieInsteadOfSession: !!+((_p = process.env.AZURE_AUTH_COOKIE_INSTEAD_SESSION) !== null && _p !== void 0 ? _p : 1),
        cookieEncryptionKeys: [
            {
                key: process.env.AZURE_AUTH_COOKIE_KEY,
                iv: process.env.AZURE_AUTH_COOKIE_IV,
            },
        ],
        isB2c: !!+((_q = process.env.AZURE_AUTH_B2C_TENANT) !== null && _q !== void 0 ? _q : 0),
        clockSkew: +((_r = process.env.AZURE_AUTH_CLOCK_SKEW) !== null && _r !== void 0 ? _r : clockSkew),
        loggingLevel: process.env.AZURE_AUTH_LOG_LEVEL,
        loggingNoPII: !!+((_s = process.env.AZURE_AUTH_LOG_PII) !== null && _s !== void 0 ? _s : 1),
        nonceLifetime: +((_t = process.env.AZURE_AUTH_NONCE_TIME) !== null && _t !== void 0 ? _t : nonceTime),
        nonceMaxAmount: +((_u = process.env.AZURE_AUTH_NONCE_COUNT) !== null && _u !== void 0 ? _u : nonceCount),
        issuer: process.env.AZURE_AUTH_ISSUER,
        cookieSameSite: !!+((_v = process.env.AZURE_AUTH_COOKIE_SAME_SITE) !== null && _v !== void 0 ? _v : 0),
    }, queryGen('body')),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/azure', {
        description: 'POST Call for azure based login',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Azure Token Response',
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
], AzureLoginController.prototype, "postLoginViaAzure", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("Azure AD" /* STRATEGY.AZURE_AD */, {
        scope: ['profile', 'email', 'openid', 'offline_access'],
        identityMetadata: process.env.AZURE_IDENTITY_METADATA,
        clientID: process.env.AZURE_AUTH_CLIENT_ID,
        responseType: 'code',
        responseMode: 'query',
        redirectUrl: process.env.AZURE_AUTH_REDIRECT_URL,
        clientSecret: process.env.AZURE_AUTH_CLIENT_SECRET,
        allowHttpForRedirectUrl: !!+((_w = process.env.AZURE_AUTH_ALLOW_HTTP_REDIRECT) !== null && _w !== void 0 ? _w : 1),
        passReqToCallback: !!+((_x = process.env.AZURE_AUTH_PASS_REQ_CALLBACK) !== null && _x !== void 0 ? _x : 0),
        validateIssuer: !!+((_y = process.env.AZURE_AUTH_VALIDATE_ISSUER) !== null && _y !== void 0 ? _y : 1),
        useCookieInsteadOfSession: !!+((_z = process.env.AZURE_AUTH_COOKIE_INSTEAD_SESSION) !== null && _z !== void 0 ? _z : 1),
        cookieEncryptionKeys: [
            {
                key: process.env.AZURE_AUTH_COOKIE_KEY,
                iv: process.env.AZURE_AUTH_COOKIE_IV,
            },
        ],
        isB2c: !!+((_0 = process.env.AZURE_AUTH_B2C_TENANT) !== null && _0 !== void 0 ? _0 : 0),
        clockSkew: +((_1 = process.env.AZURE_AUTH_CLOCK_SKEW) !== null && _1 !== void 0 ? _1 : clockSkew),
        loggingLevel: process.env.AZURE_AUTH_LOG_LEVEL,
        loggingNoPII: !!+((_2 = process.env.AZURE_AUTH_LOG_PII) !== null && _2 !== void 0 ? _2 : 1),
        nonceLifetime: +((_3 = process.env.AZURE_AUTH_NONCE_TIME) !== null && _3 !== void 0 ? _3 : nonceTime),
        nonceMaxAmount: +((_4 = process.env.AZURE_AUTH_NONCE_COUNT) !== null && _4 !== void 0 ? _4 : nonceCount),
        issuer: process.env.AZURE_AUTH_ISSUER,
        cookieSameSite: !!+((_5 = process.env.AZURE_AUTH_COOKIE_SAME_SITE) !== null && _5 !== void 0 ? _5 : 0),
    }, queryGen('query')),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.get)('/auth/azure-oauth-redirect', {
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Azure Redirect Token Response',
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
], AzureLoginController.prototype, "azureCallback", null);
AzureLoginController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.AuthClientRepository)),
    tslib_1.__param(1, (0, core_1.inject)(core_2.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(2, (0, core_1.inject)(providers_1.AuthCodeBindings.AUTH_CODE_GENERATOR_PROVIDER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.AuthClientRepository, Object, Function])
], AzureLoginController);
exports.AzureLoginController = AzureLoginController;
//# sourceMappingURL=azure-login.controller.js.map