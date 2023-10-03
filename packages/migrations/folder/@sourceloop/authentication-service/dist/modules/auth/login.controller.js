"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
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
const moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
const keys_1 = require("../../keys");
const NodeRSA=require('node-rsa');
const models_1 = require("../../models");
const providers_1 = require("../../providers");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const repositories_1 = require("../../repositories");
const tenant_config_repository_1 = require("../../repositories/tenant-config.repository");
const services_1 = require("../../services");
const _1 = require("./");
const auth_user_model_1 = require("./models/auth-user.model");
const reset_password_dto_1 = require("./models/reset-password.dto");
const token_response_dto_1 = require("./models/token-response.dto");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
let LoginController = class LoginController {
    constructor(client, user, authClientRepository, userRepo, otpCacheRepo, roleRepo, utPermsRepo, userResourcesRepository, userTenantRepo, refreshTokenRepo, revokedTokensRepo, tenantConfigRepo, userCredsRepository, logger, getJwtPayload, loginHelperService, getAuthCode, jwtSigner, loginActivityRepo, actorKey, ctx, userActivity) {
        this.client = client;
        this.user = user;
        this.authClientRepository = authClientRepository;
        this.userRepo = userRepo;
        this.otpCacheRepo = otpCacheRepo;
        this.roleRepo = roleRepo;
        this.utPermsRepo = utPermsRepo;
        this.userResourcesRepository = userResourcesRepository;
        this.userTenantRepo = userTenantRepo;
        this.refreshTokenRepo = refreshTokenRepo;
        this.revokedTokensRepo = revokedTokensRepo;
        this.tenantConfigRepo = tenantConfigRepo;
        this.userCredsRepository = userCredsRepository;
        this.logger = logger;
        this.getJwtPayload = getJwtPayload;
        this.loginHelperService = loginHelperService;
        this.getAuthCode = getAuthCode;
        this.jwtSigner = jwtSigner;
        this.loginActivityRepo = loginActivityRepo;
        this.actorKey = actorKey;
        this.ctx = ctx;
        this.userActivity = userActivity;
    }
    async login(req, client, user) {
        await this.loginHelperService.verifyClientUserLogin(req, client, user);
        try {
            if (!this.user || !this.client) {
                // Control should never reach here
                this.logger.error(`${"Client Invalid" /* AuthErrorKeys.ClientInvalid */} :: Control should never reach here`);
                throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
            }
            const token = await this.getAuthCode(this.client, this.user);
            return {
                code: token,
            };
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
    }
    async loginWithClientUser(req) {
        var _a;
        await this.loginHelperService.verifyClientUserLogin(req, this.client, this.user);
        try {
            if (!this.user || !this.client) {
                // Control should never reach here
                this.logger.error(`${"Client Invalid" /* AuthErrorKeys.ClientInvalid */} :: Control should never reach here`);
                throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
            }
            const payload = {
                clientId: this.client.clientId,
                user: this.user,
            };
            if (((_a = payload.user) === null || _a === void 0 ? void 0 : _a.id) &&
                !(await this.userRepo.firstTimeUser(payload.user.id))) {
                await this.userRepo.updateLastLogin(payload.user.id);
            }
            return await this.createJWT(payload, this.client, "ACCESS" /* LoginType.ACCESS */);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
    }
    async getToken(req, codeReader) {
        const authClient = await this.authClientRepository.findOne({
            where: {
                clientId: req.clientId,
            },
        });
        if (!authClient) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
        }
        try {
            const code = await codeReader(req.code);
            const payload = jwt.verify(code, authClient.secret, {
                audience: req.clientId,
                issuer: process.env.JWT_ISSUER,
                algorithms: ['HS256'],
            });
            if (payload.mfa) {
                throw new rest_1.HttpErrors.Unauthorized("User Verification Failed" /* AuthErrorKeys.UserVerificationFailed */);
            }
            if (payload.userId &&
                !(await this.userRepo.firstTimeUser(payload.userId))) {
                await this.userRepo.updateLastLogin(payload.userId);
            }
            return await this.createJWT(payload, authClient, "ACCESS" /* LoginType.ACCESS */);
        }
        catch (error) {
            this.logger.error(error);
            if (error.name === 'TokenExpiredError') {
                throw new rest_1.HttpErrors.Unauthorized("Code Expired" /* AuthErrorKeys.CodeExpired */);
            }
            else if (rest_1.HttpErrors.HttpError.prototype.isPrototypeOf(error)) {
                throw error;
            }
            else {
                throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
            }
        }
    }
    async exchangeToken(req, deviceId, token) {
        const payload = await this.createTokenPayload(req, token);
        return this.createJWT({
            clientId: payload.refreshPayload.clientId,
            userId: payload.refreshPayload.userId,
            externalAuthToken: payload.refreshPayload.externalAuthToken,
            externalRefreshToken: payload.refreshPayload.externalRefreshToken,
        }, payload.authClient, "RELOGIN" /* LoginType.RELOGIN */, payload.refreshPayload.tenantId);
    }
    async resetPassword(req, //about model
    auth, currentUser) {
        const token = auth === null || auth === void 0 ? void 0 : auth.replace(/bearer /i, '');
        if (!token || !req.refreshToken) {
            throw new rest_1.HttpErrors.UnprocessableEntity("TokenMissing" /* AuthenticateErrorKeys.TokenMissing */);
        }
        const refreshTokenModel = await this.refreshTokenRepo.get(req.refreshToken);
        if (refreshTokenModel.accessToken !== token) {
            throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* AuthErrorKeys.TokenInvalid */);
        }
        if (refreshTokenModel.username !== req.username ||
            currentUser.username !== req.username) {
            throw new rest_1.HttpErrors.Forbidden("NotAllowedAccess" /* AuthorizeErrorKeys.NotAllowedAccess */);
        }
        if (req.password && req.password.length <= 0) {
            throw new rest_1.HttpErrors.BadRequest("PasswordInvalid" /* AuthenticateErrorKeys.PasswordInvalid */);
        }
        let changePasswordResponse;
        if (req.oldPassword) {
         
                const privateKey=process.env.PRIVATE_DECRYPTION_KEY;
                // "-----BEGIN RSA PRIVATE KEY-----\n" +
                // "MIIEpAIBAAKCAQEAhZdivG9heeJB9VQy0jkNvE/Ku42RuwduYeruRvO7XExXJp7s\n" +
                // "MdpYwbTacz/CeJQAnx9JlzZMnMeKVpqQSpKWQc7f5lsrGx6mdsj8Uald7kg0PwDl\n" +
                // "IPIJ04okvoukxGkO4pPDVcGX07m2bCpp31b/ZDJvEWw8++1mwP9tU00qeRbqYoAp\n" +
                // "WsCgO4oMLszH6n7XOGSqeXOjvYHBmA4+5JKfmSDHYY/Wwkx3Ly4+Vqbupedju9Qt\n" +
                // "2bPYEzam94hYLkjohvjf+g8wRGWKHIqLZURR4SPClEVp+6bIebk/m7X7zBlJhGO2\n" +
                // "vNIJ9RmWe7Y41+7fF4BaUnkTC57NIkrqJwmpvQIDAQABAoIBAHm61oeqXoI3v66T\n" +
                // "CLQytOdxNeTtPWvVe6nR70nL8mBKV+ejTMqokdQAvkXiRYymIGLemaomGm2KDe6Y\n" +
                // "bP7mz/ArWC6JyJ+vsDPxNKoc0LC+Lo1yfVcl9fpCmPTgPkWTDbM8vfO4smaFhUrO\n" +
                // "4yZWGeXtZvPTU0akrssSdUZAvIEVIl/WPiV3yhIK9vSvWlPhIDlIF7mZ+KV/ctZr\n" +
                // "bu+z9HMQtQka+tVkN7/cdK2n5vbd9NQGhHLvcce6wISAl3z2CNxIoQWv1gEZKGj1\n" +
                // "mte9VH2MNqDuBxe62/nCKD/J7A8RUMmQNXLmXqMDC2iJDw9VZjRk3gxzb37ooUMq\n" +
                // "waxKaYECgYEA09BC6zVEt0rSLqvwLiTNn4czR5G2XxAsM5NhPMuZqiOI+esyeOHC\n" +
                // "QrbfGKztkrLpkUeuaERE4CowRoM2o5xfcMS5v8sCBRtcJRGSzv/7p20ZYwjc6Cq3\n" +
                // "clGcjqww7RFIcKiU7VUcP/d97LZ6Ed/qk9wbGAKZUw9P4UZkInpbws0CgYEAoXW6\n" +
                // "sTJ7XyvfMDAtIxLZQ7geeiiBfeq6w9gVTPL0BQ8ZTow4BS5rD4aeIAVkDIUQpq1E\n" +
                // "kyfueOvTgiSzHnTKFs6LGYDq11LG1vf+hL0K861Im8LGH1lb1BnEkBK464oRnxpW\n" +
                // "7E25ZofXkLhYyAOhz4HBNZVFbMKHsfZO5QAb4rECgYEAmaNZtuRnmJA0Dth2mfHm\n" +
                // "GI3n+0TNRP0lIrAHeyKvroKiC623aYlP8DZXcr2UgbE2zENzVXwXfYX8iFkK2/hE\n" +
                // "HjcECQNGzs9+sgCiPXXeYx42qOg33EuHzus1pSNvRbYgll8hz1jJ6fgqJfZiau7B\n" +
                // "Z0jjejIAZwgXR+9YGM4qGw0CgYB4FJvtj3Lr3DAYoavgKvOFBtk71wY/hKS0ZO+q\n" +
                // "lAJiBNG4dlZvnA8ps9/ERt4a5Zf1rmWS4B7etd1PLEY+/3MRNTmElTmTPM//Lt+P\n" +
                // "Dx2nDxgyJ9C7nfTKsQNcd2AqZTwnzSoags/BboQm8MOutezQ7FqqpELG2YKcG2if\n" +
                // "rc4PcQKBgQCS9T/MmCI5FJtI51OldzJrf8AP0OpRobTxHlpw1Xiax9AtiUGd1Usn\n" +
                // "uQ57xod2lBjZVjibpDP9KdnFGKWDdp/o5817NG4xVQ9phBHFLaAzrSCDXHh+4xxb\n" +
                // "N51uvBy9nUxGNkV8Ys1ZAdyTAuSiOaaaYUxqqcimTVhQ7i32JLLnuQ==\n" +
                // "-----END RSA PRIVATE KEY-----\n";
              
               const key_private = new NodeRSA(privateKey );
            const decryptedOldPassword = key_private.decrypt(req.oldPassword, "utf8");
            const decryptedNewPassword = key_private.decrypt(req.password, "utf8");
        
            changePasswordResponse = await this.userRepo.updatePassword(req.username, decryptedOldPassword, decryptedNewPassword);
        }
        else {
            const privateKey=process.env.PRIVATE_DECRYPTION_KEY
            // "-----BEGIN RSA PRIVATE KEY-----\n" +
            // "MIIEpAIBAAKCAQEAhZdivG9heeJB9VQy0jkNvE/Ku42RuwduYeruRvO7XExXJp7s\n" +
            // "MdpYwbTacz/CeJQAnx9JlzZMnMeKVpqQSpKWQc7f5lsrGx6mdsj8Uald7kg0PwDl\n" +
            // "IPIJ04okvoukxGkO4pPDVcGX07m2bCpp31b/ZDJvEWw8++1mwP9tU00qeRbqYoAp\n" +
            // "WsCgO4oMLszH6n7XOGSqeXOjvYHBmA4+5JKfmSDHYY/Wwkx3Ly4+Vqbupedju9Qt\n" +
            // "2bPYEzam94hYLkjohvjf+g8wRGWKHIqLZURR4SPClEVp+6bIebk/m7X7zBlJhGO2\n" +
            // "vNIJ9RmWe7Y41+7fF4BaUnkTC57NIkrqJwmpvQIDAQABAoIBAHm61oeqXoI3v66T\n" +
            // "CLQytOdxNeTtPWvVe6nR70nL8mBKV+ejTMqokdQAvkXiRYymIGLemaomGm2KDe6Y\n" +
            // "bP7mz/ArWC6JyJ+vsDPxNKoc0LC+Lo1yfVcl9fpCmPTgPkWTDbM8vfO4smaFhUrO\n" +
            // "4yZWGeXtZvPTU0akrssSdUZAvIEVIl/WPiV3yhIK9vSvWlPhIDlIF7mZ+KV/ctZr\n" +
            // "bu+z9HMQtQka+tVkN7/cdK2n5vbd9NQGhHLvcce6wISAl3z2CNxIoQWv1gEZKGj1\n" +
            // "mte9VH2MNqDuBxe62/nCKD/J7A8RUMmQNXLmXqMDC2iJDw9VZjRk3gxzb37ooUMq\n" +
            // "waxKaYECgYEA09BC6zVEt0rSLqvwLiTNn4czR5G2XxAsM5NhPMuZqiOI+esyeOHC\n" +
            // "QrbfGKztkrLpkUeuaERE4CowRoM2o5xfcMS5v8sCBRtcJRGSzv/7p20ZYwjc6Cq3\n" +
            // "clGcjqww7RFIcKiU7VUcP/d97LZ6Ed/qk9wbGAKZUw9P4UZkInpbws0CgYEAoXW6\n" +
            // "sTJ7XyvfMDAtIxLZQ7geeiiBfeq6w9gVTPL0BQ8ZTow4BS5rD4aeIAVkDIUQpq1E\n" +
            // "kyfueOvTgiSzHnTKFs6LGYDq11LG1vf+hL0K861Im8LGH1lb1BnEkBK464oRnxpW\n" +
            // "7E25ZofXkLhYyAOhz4HBNZVFbMKHsfZO5QAb4rECgYEAmaNZtuRnmJA0Dth2mfHm\n" +
            // "GI3n+0TNRP0lIrAHeyKvroKiC623aYlP8DZXcr2UgbE2zENzVXwXfYX8iFkK2/hE\n" +
            // "HjcECQNGzs9+sgCiPXXeYx42qOg33EuHzus1pSNvRbYgll8hz1jJ6fgqJfZiau7B\n" +
            // "Z0jjejIAZwgXR+9YGM4qGw0CgYB4FJvtj3Lr3DAYoavgKvOFBtk71wY/hKS0ZO+q\n" +
            // "lAJiBNG4dlZvnA8ps9/ERt4a5Zf1rmWS4B7etd1PLEY+/3MRNTmElTmTPM//Lt+P\n" +
            // "Dx2nDxgyJ9C7nfTKsQNcd2AqZTwnzSoags/BboQm8MOutezQ7FqqpELG2YKcG2if\n" +
            // "rc4PcQKBgQCS9T/MmCI5FJtI51OldzJrf8AP0OpRobTxHlpw1Xiax9AtiUGd1Usn\n" +
            // "uQ57xod2lBjZVjibpDP9KdnFGKWDdp/o5817NG4xVQ9phBHFLaAzrSCDXHh+4xxb\n" +
            // "N51uvBy9nUxGNkV8Ys1ZAdyTAuSiOaaaYUxqqcimTVhQ7i32JLLnuQ==\n" +
            // "-----END RSA PRIVATE KEY-----\n";
          
           const key_private = new NodeRSA(privateKey );
       // const decryptedOldPassword = key_private.decrypt(req.oldPassword, "utf8");
        const decryptedNewPassword = key_private.decrypt(req.password, "utf8");
        // console.log(decryptedNewPassword + decryptedOldPassword)
            changePasswordResponse = await this.userRepo.changePassword(req.username, decryptedNewPassword);
        }
        if (!changePasswordResponse) {
            throw new rest_1.HttpErrors.UnprocessableEntity('Unable to set password !');
        }
        const userTenant = await this.userTenantRepo.findOne({
            where: {
                userId: changePasswordResponse.id,
                tenantId: currentUser.tenantId,
            },
        });
        if (!userTenant) {
            throw new rest_1.HttpErrors.Unauthorized("UserInactive" /* AuthenticateErrorKeys.UserInactive */);
        }
        if (userTenant.status && userTenant.status < 1 /* UserStatus.ACTIVE */) {
            await this.userRepo.userTenants(changePasswordResponse.id).patch({
                status: 1 /* UserStatus.ACTIVE */,
            });
        }
        await this.revokedTokensRepo.set(token, { token });
        await this.refreshTokenRepo.delete(req.refreshToken);
        return new core_1.SuccessResponse({
            success: true,
        });
    }
    async me() {
        if (!this.user) {
            throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* AuthErrorKeys.TokenInvalid */);
        }
        delete this.user.deviceInfo;
        return new auth_user_model_1.AuthUser(this.user);
    }
    async switchToken(req) {
        if (!req.tenantId) {
            throw new rest_1.HttpErrors.BadRequest('Tenant ID is required');
        }
        if (!this.user) {
            throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* AuthErrorKeys.TokenInvalid */);
        }
        const payload = await this.createTokenPayload(req);
        return this.createJWT({
            clientId: payload.refreshPayload.clientId,
            user: this.user,
            externalAuthToken: payload.refreshPayload.externalAuthToken,
            externalRefreshToken: payload.refreshPayload.externalRefreshToken,
        }, payload.authClient, "RELOGIN" /* LoginType.RELOGIN */, req.tenantId);
    }
    async createTokenPayload(req, token) {
        const refreshPayload = await this.refreshTokenRepo.get(req.refreshToken);
        if (!refreshPayload) {
            throw new rest_1.HttpErrors.Unauthorized("Token Expired" /* AuthErrorKeys.TokenExpired */);
        }
        const authClient = await this.authClientRepository.findOne({
            where: {
                clientId: refreshPayload.clientId,
            },
        });
        if (!authClient) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
        }
        const accessToken = token === null || token === void 0 ? void 0 : token.split(' ')[1];
        if (!accessToken || refreshPayload.accessToken !== accessToken) {
            throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* AuthErrorKeys.TokenInvalid */);
        }
        await this.revokedTokensRepo.set(refreshPayload.accessToken, {
            token: refreshPayload.accessToken,
        });
        await this.refreshTokenRepo.delete(req.refreshToken);
        return {
            refreshPayload: refreshPayload,
            authClient: authClient,
        };
    }
    async createJWT(payload, authClient, loginType, tenantId) {
        var _a;
        try {
            const size = 32;
            const ms = 1000;
            let user;
            if (payload.user) {
                user = payload.user;
            }
            else if (payload.userId) {
                user = await this.userRepo.findById(payload.userId, {
                    include: [
                        {
                            relation: 'defaultTenant',
                        },
                    ],
                });
                if (payload.externalAuthToken && payload.externalRefreshToken) {
                    user.externalAuthToken = payload.externalAuthToken;
                    user.externalRefreshToken =
                        payload.externalRefreshToken;
                }
            }
            else {
                // Do nothing and move ahead
            }
            if (!user) {
                throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
            }
            const data = await this.getJwtPayload(user, authClient, tenantId);
            const accessToken = await this.jwtSigner(data, {
                expiresIn: authClient.accessTokenExpiration,
            });
            const refreshToken = crypto_1.default.randomBytes(size).toString('hex');
            // Set refresh token into redis for later verification
            await this.refreshTokenRepo.set(refreshToken, {
                clientId: authClient.clientId,
                userId: user.id,
                username: user.username,
                accessToken,
                externalAuthToken: user.externalAuthToken,
                externalRefreshToken: user.externalRefreshToken,
                tenantId: data.tenantId,
            }, { ttl: authClient.refreshTokenExpiration * ms });
            const userTenant = await this.userTenantRepo.findOne({
                where: { userId: user.id },
            });
            if ((_a = this.userActivity) === null || _a === void 0 ? void 0 : _a.markUserActivity)
                this.markUserActivity(user, userTenant, { ...data }, loginType);
            return new token_response_dto_1.TokenResponse({
                accessToken,
                refreshToken,
                expires: (0, moment_timezone_1.default)()
                    .add(authClient.accessTokenExpiration, 's')
                    .toDate()
                    .getTime(),
            });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.HttpError.prototype.isPrototypeOf(error)) {
                throw error;
            }
            else {
                throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
            }
        }
    }
    markUserActivity(user, userTenant, payload, loginType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const size = 16;
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
            const activityPayload = JSON.stringify(payload);
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
            // make an entry to mark the users login activity
            let actor;
            let tenantId;
            if (userTenant) {
                actor = (_f = (_e = userTenant[this.actorKey]) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : '0';
                tenantId = userTenant.tenantId;
            }
            else {
                actor = (_h = (_g = user['id']) === null || _g === void 0 ? void 0 : _g.toString()) !== null && _h !== void 0 ? _h : '0';
                tenantId = user.defaultTenantId;
            }
            const loginActivity = new models_1.LoginActivity({
                actor,
                tenantId,
                loginTime: new Date(),
                tokenPayload,
                loginType,
                deviceInfo: (_j = this.ctx.request.headers['user-agent']) === null || _j === void 0 ? void 0 : _j.toString(),
                ipAddress,
            });
            this.loginActivityRepo.create(loginActivity).catch(() => {
                this.logger.error(`Failed to add the login activity => ${JSON.stringify(loginActivity)}`);
            });
        }
    }
};
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticateClient)("client-password" /* STRATEGY.CLIENT_PASSWORD */),
    (0, loopback4_authentication_1.authenticate)("local" /* STRATEGY.LOCAL */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/login', {
        description: 'Gets you the code that will be used for getting token (webapps)',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Auth Code that you can use to generate access and refresh tokens using the POST /auth/token API',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: Object,
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__param(1, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_CLIENT)),
    tslib_1.__param(2, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [_1.LoginRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticateClient)("client-password" /* STRATEGY.CLIENT_PASSWORD */),
    (0, loopback4_authentication_1.authenticate)("OAuth2 resource owner grant" /* STRATEGY.OAUTH2_RESOURCE_OWNER_GRANT */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/login-token', {
        description: 'Gets you refresh token and access token in one hit. (mobile app)',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Token Response Model',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: { [core_1.X_TS_TYPE]: token_response_dto_1.TokenResponse },
                    },
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [_1.LoginRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginController.prototype, "loginWithClientUser", null);
tslib_1.__decorate([
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/token', {
        description: 'Send the code received from the POST /auth/login api and get refresh token and access token (webapps)',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Token Response',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: { [core_1.X_TS_TYPE]: token_response_dto_1.TokenResponse },
                    },
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__param(1, (0, context_1.inject)(providers_1.AuthCodeBindings.CODEREADER_PROVIDER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [_1.AuthTokenRequest, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginController.prototype, "getToken", null);
tslib_1.__decorate([
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/token-refresh', {
        security: core_1.OPERATION_SECURITY_SPEC,
        description: 'Gets you a new access and refresh token once your access token is expired',
        //(both mobile and web)
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'New Token Response',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: { [core_1.X_TS_TYPE]: token_response_dto_1.TokenResponse },
                    },
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__param(1, rest_1.param.header.string('device_id')),
    tslib_1.__param(2, rest_1.param.header.string('Authorization')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [_1.AuthRefreshTokenRequest, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginController.prototype, "exchangeToken", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, { passReqToCallback: true }),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.patch)(`auth/change-password`, {
        security: core_1.OPERATION_SECURITY_SPEC,
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'If User password successfully changed.',
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            [core_1.CONTENT_TYPE.JSON]: {
                schema: (0, rest_1.getModelSchemaRef)(reset_password_dto_1.ResetPassword, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.header.string('Authorization')),
    tslib_1.__param(2, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [reset_password_dto_1.ResetPassword, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginController.prototype, "resetPassword", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, {
        passReqToCallback: true,
    }),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.get)('/auth/me', {
        security: core_1.OPERATION_SECURITY_SPEC,
        description: 'To get the user details',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'User Object',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: auth_user_model_1.AuthUser,
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], LoginController.prototype, "me", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, {
        passReqToCallback: true,
    }),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/switch-token', {
        security: core_1.OPERATION_SECURITY_SPEC,
        description: 'To switch the access-token',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Switch access token with the tenant id provided.',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: { [core_1.X_TS_TYPE]: token_response_dto_1.TokenResponse },
                    },
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [_1.AuthRefreshTokenRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginController.prototype, "switchToken", null);
LoginController = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_CLIENT)),
    tslib_1.__param(1, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.AuthClientRepository)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.OtpCacheRepository)),
    tslib_1.__param(5, (0, repository_1.repository)(repositories_1.RoleRepository)),
    tslib_1.__param(6, (0, repository_1.repository)(repositories_1.UserLevelPermissionRepository)),
    tslib_1.__param(7, (0, repository_1.repository)(repositories_1.UserLevelResourceRepository)),
    tslib_1.__param(8, (0, repository_1.repository)(repositories_1.UserTenantRepository)),
    tslib_1.__param(9, (0, repository_1.repository)(repositories_1.RefreshTokenRepository)),
    tslib_1.__param(10, (0, repository_1.repository)(repositories_1.RevokedTokenRepository)),
    tslib_1.__param(11, (0, repository_1.repository)(tenant_config_repository_1.TenantConfigRepository)),
    tslib_1.__param(12, (0, repository_1.repository)(repositories_1.UserCredentialsRepository)),
    tslib_1.__param(13, (0, context_1.inject)(core_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__param(14, (0, context_1.inject)(keys_1.AuthServiceBindings.JWTPayloadProvider)),
    tslib_1.__param(15, (0, context_1.inject)('services.LoginHelperService')),
    tslib_1.__param(16, (0, context_1.inject)(providers_1.AuthCodeBindings.AUTH_CODE_GENERATOR_PROVIDER)),
    tslib_1.__param(17, (0, context_1.inject)(providers_1.AuthCodeBindings.JWT_SIGNER)),
    tslib_1.__param(18, (0, repository_1.repository)(repositories_1.LoginActivityRepository)),
    tslib_1.__param(19, (0, context_1.inject)(keys_1.AuthServiceBindings.ActorIdKey)),
    tslib_1.__param(20, context_1.inject.context()),
    tslib_1.__param(21, (0, context_1.inject)(keys_1.AuthServiceBindings.MarkUserActivity, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object, Object, repositories_1.AuthClientRepository,
        repositories_1.UserRepository,
        repositories_1.OtpCacheRepository,
        repositories_1.RoleRepository,
        repositories_1.UserLevelPermissionRepository,
        repositories_1.UserLevelResourceRepository,
        repositories_1.UserTenantRepository,
        repositories_1.RefreshTokenRepository,
        repositories_1.RevokedTokenRepository,
        tenant_config_repository_1.TenantConfigRepository,
        repositories_1.UserCredentialsRepository, Object, Function, services_1.LoginHelperService, Function, Function, repositories_1.LoginActivityRepository, String, rest_1.RequestContext, Object])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map