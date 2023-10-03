"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutController = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_1 = require("@sourceloop/core");
const base_64_1 = require("base-64");
const https_proxy_agent_1 = require("https-proxy-agent");
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const url_1 = require("url");
const models_1 = require("../../models");
const repositories_1 = require("../../repositories");
const keys_1 = require("../../keys");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const proxyUrl = (_a = process.env.HTTPS_PROXY) !== null && _a !== void 0 ? _a : process.env.HTTP_PROXY;
const getProxyAgent = () => {
    if (proxyUrl) {
        return new https_proxy_agent_1.HttpsProxyAgent(proxyUrl);
    }
    return undefined;
};
const size = 16;
let LogoutController = class LogoutController {
    constructor(req, revokedTokens, refreshTokenRepo, logger, loginActivityRepo, actorKey, ctx, userRepo, userTenantRepo, getJwtPayload, client, userActivity) {
        this.req = req;
        this.revokedTokens = revokedTokens;
        this.refreshTokenRepo = refreshTokenRepo;
        this.logger = logger;
        this.loginActivityRepo = loginActivityRepo;
        this.actorKey = actorKey;
        this.ctx = ctx;
        this.userRepo = userRepo;
        this.userTenantRepo = userTenantRepo;
        this.getJwtPayload = getJwtPayload;
        this.client = client;
        this.userActivity = userActivity;
    }
    async logout(auth, req) {
        var _a;
        const token = auth === null || auth === void 0 ? void 0 : auth.replace(/bearer /i, '');
        if (!token || !req.refreshToken) {
            throw new rest_1.HttpErrors.UnprocessableEntity("TokenMissing" /* AuthenticateErrorKeys.TokenMissing */);
        }
        const refreshTokenModel = await this.refreshTokenRepo.get(req.refreshToken);
        if (!refreshTokenModel) {
            throw new rest_1.HttpErrors.Unauthorized("Token Expired" /* AuthErrorKeys.TokenExpired */);
        }
        if (refreshTokenModel.accessToken !== token) {
            throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* AuthErrorKeys.TokenInvalid */);
        }
        await this.revokedTokens.set(token, { token });
        await this.refreshTokenRepo.delete(req.refreshToken);
        if (refreshTokenModel.pubnubToken) {
            await this.refreshTokenRepo.delete(refreshTokenModel.pubnubToken);
        }
        //
        const user = await this.userRepo.findById(refreshTokenModel.userId);
        const userTenant = await this.userTenantRepo.findOne({
            where: { userId: user.id },
        });
        if ((_a = this.userActivity) === null || _a === void 0 ? void 0 : _a.markUserActivity)
            this.markUserActivity(refreshTokenModel, user, userTenant);
        return new core_1.SuccessResponse({
            success: true,
            key: refreshTokenModel.userId,
        });
    }
    async keycloakLogout(auth, req) {
        const token = auth === null || auth === void 0 ? void 0 : auth.replace(/bearer /i, '');
        if (!token || !req.refreshToken) {
            throw new rest_1.HttpErrors.UnprocessableEntity("TokenMissing" /* AuthenticateErrorKeys.TokenMissing */);
        }
        const refreshTokenModel = await this.refreshTokenRepo.get(req.refreshToken);
        if (!refreshTokenModel) {
            throw new rest_1.HttpErrors.Unauthorized("Token Expired" /* AuthErrorKeys.TokenExpired */);
        }
        if (refreshTokenModel.externalRefreshToken) {
            const params = new url_1.URLSearchParams();
            const logoutUrl = `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`;
            params.append('refresh_token', refreshTokenModel.externalRefreshToken);
            const strToEncode = `${process.env.KEYCLOAK_CLIENT_ID}:${process.env.KEYCLOAK_CLIENT_SECRET}`;
            (0, node_fetch_1.default)(logoutUrl, {
                agent: getProxyAgent(),
                method: 'post',
                body: params,
                headers: {
                    Authorization: `Basic ${(0, base_64_1.encode)(strToEncode)}`,
                },
            })
                .then(() => {
                this.logger.info(`User ${refreshTokenModel.username} logged off successfully from keycloak.`);
            })
                .catch(err => {
                this.logger.error(`Error while logging off from keycloak. Error :: ${err} ${JSON.stringify(err)}`);
            });
        }
        if (refreshTokenModel.accessToken !== token) {
            throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* AuthErrorKeys.TokenInvalid */);
        }
        await this.revokedTokens.set(token, { token });
        await this.refreshTokenRepo.delete(req.refreshToken);
        if (refreshTokenModel.pubnubToken) {
            await this.refreshTokenRepo.delete(refreshTokenModel.pubnubToken);
        }
        return new core_1.SuccessResponse({
            success: true,
            key: refreshTokenModel.userId,
        });
    }
    markUserActivity(refreshTokenModel, user, userTenant) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const encryptionKey = process.env.ENCRYPTION_KEY;
        if (encryptionKey) {
            const iv = crypto_1.default.randomBytes(size);
            /* encryption of IP Address */
            const cipherIp = crypto_1.default.createCipheriv('aes-256-gcm', encryptionKey, iv);
            const ip = (_d = (_b = (_a = this.ctx.request.headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : (_c = this.ctx.request.socket.remoteAddress) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '';
            const encyptIp = Buffer.concat([
                cipherIp.update(ip, 'utf8'),
                cipherIp.final(),
            ]);
            const authTagIp = cipherIp.getAuthTag();
            const ipAddress = JSON.stringify({
                iv: iv.toString('hex'),
                encryptedData: encyptIp.toString('hex'),
                authTag: authTagIp.toString('hex'),
            });
            /* encryption of Paylolad Address */
            const cipherPayload = crypto_1.default.createCipheriv('aes-256-gcm', encryptionKey, iv);
            const activityPayload = JSON.stringify({
                ...user,
                clientId: refreshTokenModel.clientId,
            });
            const encyptPayload = Buffer.concat([
                cipherPayload.update(activityPayload, 'utf8'),
                cipherPayload.final(),
            ]);
            const authTagPayload = cipherIp.getAuthTag();
            const tokenPayload = JSON.stringify({
                iv: iv.toString('hex'),
                encryptedData: encyptPayload.toString('hex'),
                authTag: authTagPayload.toString('hex'),
            });
            let actor, tenantId;
            if (userTenant) {
                actor = (_f = (_e = userTenant[this.actorKey]) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : '0';
                tenantId = userTenant.tenantId;
            }
            else {
                actor = (_h = (_g = user['id']) === null || _g === void 0 ? void 0 : _g.toString()) !== null && _h !== void 0 ? _h : '0';
                tenantId = (_j = user.defaultTenantId) !== null && _j !== void 0 ? _j : '0';
            }
            const loginActivity = new models_1.LoginActivity({
                actor,
                tenantId,
                loginTime: new Date(),
                tokenPayload,
                deviceInfo: (_k = this.ctx.request.headers['user-agent']) === null || _k === void 0 ? void 0 : _k.toString(),
                loginType: "LOGOUT" /* LoginType.LOGOUT */,
                ipAddress,
            });
            this.loginActivityRepo.create(loginActivity).catch(() => {
                this.logger.error(`Failed to add the login activity => ${JSON.stringify(loginActivity)}`);
            });
        }
    }
};
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, {
        passReqToCallback: true,
    }),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/logout', {
        security: core_1.OPERATION_SECURITY_SPEC,
        description: 'To logout',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Success Response',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: { [core_1.X_TS_TYPE]: core_1.SuccessResponse },
                    },
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, rest_1.param.header.string('Authorization', {
        description: 'This is the access token which is required to authenticate user.',
    })),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            [core_1.CONTENT_TYPE.JSON]: {
                schema: (0, rest_1.getModelSchemaRef)(models_1.RefreshTokenRequest, {
                    partial: true,
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.RefreshTokenRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], LogoutController.prototype, "logout", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, {
        passReqToCallback: true,
    }),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/keycloak/logout', {
        security: core_1.OPERATION_SECURITY_SPEC,
        description: 'This API will log out the user from application as well as keycloak',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Success Response',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: { [core_1.X_TS_TYPE]: core_1.SuccessResponse },
                    },
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, rest_1.param.header.string('Authorization', {
        description: 'This is the access token which is required to authenticate user.',
    })),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            [core_1.CONTENT_TYPE.JSON]: {
                schema: (0, rest_1.getModelSchemaRef)(models_1.RefreshTokenRequest, {
                    partial: true,
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.RefreshTokenRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], LogoutController.prototype, "keycloakLogout", null);
LogoutController = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.RevokedTokenRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.RefreshTokenRepository)),
    tslib_1.__param(3, (0, context_1.inject)(core_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.LoginActivityRepository)),
    tslib_1.__param(5, (0, context_1.inject)(keys_1.AuthServiceBindings.ActorIdKey)),
    tslib_1.__param(6, context_1.inject.context()),
    tslib_1.__param(7, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(8, (0, repository_1.repository)(repositories_1.UserTenantRepository)),
    tslib_1.__param(9, (0, context_1.inject)(keys_1.AuthServiceBindings.JWTPayloadProvider)),
    tslib_1.__param(10, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_CLIENT)),
    tslib_1.__param(11, (0, context_1.inject)(keys_1.AuthServiceBindings.MarkUserActivity, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object, repositories_1.RevokedTokenRepository,
        repositories_1.RefreshTokenRepository, Object, repositories_1.LoginActivityRepository, String, rest_1.RequestContext,
        repositories_1.UserRepository,
        repositories_1.UserTenantRepository, Function, Object, Object])
], LogoutController);
exports.LogoutController = LogoutController;
//# sourceMappingURL=logout.controller.js.map