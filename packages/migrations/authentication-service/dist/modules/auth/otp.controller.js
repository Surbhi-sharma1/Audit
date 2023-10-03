"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_1 = require("@sourceloop/core");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const otplib_1 = require("otplib");
const qrcode_1 = tslib_1.__importDefault(require("qrcode"));
const providers_1 = require("../../providers");
const repositories_1 = require("../../repositories");
const _1 = require("./");
const otp_send_request_dto_1 = require("./models/otp-send-request.dto");
let OtpController = class OtpController {
    constructor(authClientRepository, userRepo, otpCacheRepo, userCredsRepository, logger) {
        this.authClientRepository = authClientRepository;
        this.userRepo = userRepo;
        this.otpCacheRepo = otpCacheRepo;
        this.userCredsRepository = userCredsRepository;
        this.logger = logger;
    }
    // OTP
    async sendOtp(req) {
        // This is intentional
    }
    async verifyOtp(req, user, codeWriter) {
        const otpCache = await this.otpCacheRepo.get(req.key);
        if (user === null || user === void 0 ? void 0 : user.id) {
            otpCache.userId = user.id;
        }
        const codePayload = {
            clientId: otpCache.clientId,
            userId: otpCache.userId,
        };
        const token = await codeWriter(jwt.sign(codePayload, otpCache.clientSecret, {
            expiresIn: 180,
            audience: otpCache.clientId,
            issuer: process.env.JWT_ISSUER,
            algorithm: 'HS256',
        }));
        return {
            code: token,
        };
    }
    // Google Authenticator
    async checkQr(code, clientId, codeReader) {
        var _a, _b;
        if (!clientId) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
        }
        if (!code) {
            throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* AuthErrorKeys.TokenInvalid */);
        }
        const authClient = await this.authClientRepository.findOne({
            where: {
                clientId: clientId,
            },
        });
        if (!authClient) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
        }
        try {
            const authCode = await codeReader(code);
            const payload = jwt.verify(authCode, authClient.secret, {
                audience: clientId,
                issuer: process.env.JWT_ISSUER,
                algorithms: ['HS256'],
            });
            const userId = (_a = payload.userId) !== null && _a !== void 0 ? _a : (_b = payload.user) === null || _b === void 0 ? void 0 : _b.id;
            const userCreds = await this.userCredsRepository.findOne({
                where: {
                    userId: userId,
                },
                fields: {
                    secretKey: true,
                },
            });
            if (!userCreds) {
                throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
            }
            return {
                isGenerated: Boolean(userCreds.secretKey),
            };
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
    async createQr(req, codeReader) {
        var _a, _b, _c, _d;
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
            const userId = (_a = payload.userId) !== null && _a !== void 0 ? _a : (_b = payload.user) === null || _b === void 0 ? void 0 : _b.id;
            const userCreds = await this.userCredsRepository.findOne({
                where: {
                    userId: userId,
                },
                fields: {
                    id: true,
                },
            });
            if (!userCreds) {
                throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
            }
            const secretKey = otplib_1.authenticator.generateSecret();
            await this.userCredsRepository.updateById(userCreds.id, {
                secretKey: secretKey,
            });
            const appName = (_c = process.env.APP_NAME) !== null && _c !== void 0 ? _c : 'auth-service';
            let username = (_d = payload.user) === null || _d === void 0 ? void 0 : _d.username;
            if (!username) {
                const user = await this.userRepo.findById(userId);
                username = user.username;
            }
            const otpauth = otplib_1.authenticator.keyuri(username, appName, secretKey);
            const qrCode = await qrcode_1.default.toDataURL(otpauth);
            return {
                qrCode,
            };
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
};
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticateClient)("client-password" /* STRATEGY.CLIENT_PASSWORD */),
    (0, loopback4_authentication_1.authenticate)("otp" /* STRATEGY.OTP */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/send-otp', {
        description: 'Sends OTP',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Sends otp to user',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: Object,
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [otp_send_request_dto_1.OtpSendRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], OtpController.prototype, "sendOtp", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("otp" /* STRATEGY.OTP */),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/verify-otp', {
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
    tslib_1.__param(1, (0, context_1.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__param(2, (0, context_1.inject)(providers_1.AuthCodeBindings.CODEWRITER_PROVIDER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [_1.OtpLoginRequest, Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], OtpController.prototype, "verifyOtp", null);
tslib_1.__decorate([
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.get)('/auth/check-qr-code', {
        description: 'Returns isGenerated:true if secret_key already exist',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'secret_key already exists',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: Object,
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, rest_1.param.header.string('code')),
    tslib_1.__param(1, rest_1.param.header.string('clientId')),
    tslib_1.__param(2, (0, context_1.inject)(providers_1.AuthCodeBindings.CODEREADER_PROVIDER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], OtpController.prototype, "checkQr", null);
tslib_1.__decorate([
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)('/auth/create-qr-code', {
        description: 'Generates a new qrCode for Authenticator App',
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'qrCode that you can use to generate codes in Authenticator App',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: Object,
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
], OtpController.prototype, "createQr", null);
OtpController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.AuthClientRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.OtpCacheRepository)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.UserCredentialsRepository)),
    tslib_1.__param(4, (0, context_1.inject)(core_1.LOGGER.LOGGER_INJECT)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.AuthClientRepository,
        repositories_1.UserRepository,
        repositories_1.OtpCacheRepository,
        repositories_1.UserCredentialsRepository, Object])
], OtpController);
exports.OtpController = OtpController;
//# sourceMappingURL=otp.controller.js.map