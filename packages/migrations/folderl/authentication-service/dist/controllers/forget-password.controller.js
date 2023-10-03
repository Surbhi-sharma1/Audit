"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordController = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_2 = require("@sourceloop/core");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const keys_1 = require("../keys");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
let ForgetPasswordController = class ForgetPasswordController {
    constructor(userRepo, revokedTokensRepo, loginHelperService, logger) {
        this.userRepo = userRepo;
        this.revokedTokensRepo = revokedTokensRepo;
        this.loginHelperService = loginHelperService;
        this.logger = logger;
    }
    async forgetPassword(req, client, forgetPasswordHandler) {
        var _a, _b;
        const user = await this.userRepo.findOne({
            where: {
                username: req.username,
            },
            include: ['credentials'],
        });
        try {
            await this.loginHelperService.verifyClientUserLogin(req, client, user);
        }
        catch (e) {
            return;
        }
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            this.logger.info(`Forget password attempted for invalid user`);
            return;
        }
        if (!user.email) {
            this.logger.info(`Forget password attempted for user without email`);
            return;
        }
        const codePayload = {
            clientId: client.clientId,
            userId: parseInt(user.id),
            user: new models_1.User({
                id: user.id,
                email: user.email,
                username: user.username,
            }),
        };
        // Default expiry is 30 minutes
        const expiryDuration = parseInt((_a = process.env.FORGOT_PASSWORD_LINK_EXPIRY) !== null && _a !== void 0 ? _a : '1800');
        const token = jwt.sign(codePayload, process.env.JWT_SECRET, {
            expiresIn: expiryDuration,
            audience: req.client_id,
            subject: user.username.toLowerCase(),
            issuer: process.env.JWT_ISSUER,
            algorithm: 'HS256',
        });
        if (((_b = user === null || user === void 0 ? void 0 : user.credentials) === null || _b === void 0 ? void 0 : _b.authProvider) !== core_2.AuthProvider.INTERNAL) {
            throw new rest_1.HttpErrors.BadRequest("PasswordCannotBeChangedForExternalUser" /* AuthenticateErrorKeys.PasswordCannotBeChanged */);
        }
        await forgetPasswordHandler({
            code: token,
            expiry: expiryDuration,
            email: user.email,
            user: (0, lodash_1.omit)(user, 'credentials'),
        });
    }
    async verifyResetPasswordLink(token) {
        let payload;
        const isRevoked = await this.revokedTokensRepo.get(token);
        if (isRevoked === null || isRevoked === void 0 ? void 0 : isRevoked.token) {
            throw new rest_1.HttpErrors.Unauthorized("TokenRevoked" /* AuthenticateErrorKeys.TokenRevoked */);
        }
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET, {
                issuer: process.env.JWT_ISSUER,
                algorithms: ['HS256'],
            });
        }
        catch (error) {
            throw new rest_1.HttpErrors.Unauthorized("Token Expired" /* AuthErrorKeys.TokenExpired */);
        }
        if (!payload.clientId || !payload.user) {
            throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* AuthErrorKeys.TokenInvalid */);
        }
        return new core_2.SuccessResponse({
            success: true,
        });
    }
    async resetPassword(req, client) {
        if (!req.token) {
            throw new rest_1.HttpErrors.UnprocessableEntity("TokenMissing" /* AuthenticateErrorKeys.TokenMissing */);
        }
        if (req.password && req.password.length <= 0) {
            throw new rest_1.HttpErrors.BadRequest("PasswordInvalid" /* AuthenticateErrorKeys.PasswordInvalid */);
        }
        let payload;
        const isRevoked = await this.revokedTokensRepo.get(req.token);
        if (isRevoked === null || isRevoked === void 0 ? void 0 : isRevoked.token) {
            throw new rest_1.HttpErrors.Unauthorized("TokenRevoked" /* AuthenticateErrorKeys.TokenRevoked */);
        }
        try {
            payload = jwt.verify(req.token, process.env.JWT_SECRET, {
                issuer: process.env.JWT_ISSUER,
                algorithms: ['HS256'],
            });
        }
        catch (error) {
            throw new rest_1.HttpErrors.Unauthorized("Token Expired" /* AuthErrorKeys.TokenExpired */);
        }
        if (!payload.clientId || !payload.user) {
            throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* AuthErrorKeys.TokenInvalid */);
        }
        const user = await this.userRepo.findOne({
            where: {
                username: payload.user.username,
            },
        });
        await this.loginHelperService.verifyClientUserLogin(req, client, user);
        await this.userRepo.changePassword(payload.user.username, req.password);
        await this.revokedTokensRepo.set(req.token, {
            token: req.token,
        });
    }
};
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticateClient)("client-password" /* STRATEGY.CLIENT_PASSWORD */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)(`auth/forget-password`, {
        security: core_2.OPERATION_SECURITY_SPEC,
        responses: {
            [204 /* STATUS_CODE.NO_CONTENT */]: {
                description: 'Success Response.',
            },
            ...core_2.ErrorCodes,
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__param(1, (0, core_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_CLIENT)),
    tslib_1.__param(2, (0, core_1.inject)(keys_1.AuthServiceBindings.ForgotPasswordHandler)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ForgetPasswordDto,
        models_1.AuthClient, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], ForgetPasswordController.prototype, "forgetPassword", null);
tslib_1.__decorate([
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.get)(`auth/verify-reset-password-link`, {
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Check if Token Is Valid and not Expired.',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('token', { required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ForgetPasswordController.prototype, "verifyResetPasswordLink", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticateClient)("client-password" /* STRATEGY.CLIENT_PASSWORD */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.patch)(`auth/reset-password`, {
        security: core_2.OPERATION_SECURITY_SPEC,
        responses: {
            [204 /* STATUS_CODE.NO_CONTENT */]: {
                description: 'If User password successfully changed.',
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__param(1, (0, core_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_CLIENT)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ResetPasswordWithClient,
        models_1.AuthClient]),
    tslib_1.__metadata("design:returntype", Promise)
], ForgetPasswordController.prototype, "resetPassword", null);
ForgetPasswordController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.RevokedTokenRepository)),
    tslib_1.__param(2, (0, core_1.inject)('services.LoginHelperService')),
    tslib_1.__param(3, (0, core_1.inject)(core_2.LOGGER.LOGGER_INJECT)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.RevokedTokenRepository,
        services_1.LoginHelperService, Object])
], ForgetPasswordController);
exports.ForgetPasswordController = ForgetPasswordController;
//# sourceMappingURL=forget-password.controller.js.map