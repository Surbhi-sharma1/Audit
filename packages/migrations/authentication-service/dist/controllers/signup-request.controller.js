"use strict";
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupRequestController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const core_1 = require("@sourceloop/core");
const loopback4_authorization_1 = require("loopback4-authorization");
const signup_request_dto_model_1 = require("../models/signup-request-dto.model");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const local_user_profile_1 = require("../models/local-user-profile");
const signup_with_token_response_dto_model_1 = require("../models/signup-with-token-response-dto.model");
const core_2 = require("@loopback/core");
const loopback4_authentication_1 = require("loopback4-authentication");
const signup_request_model_1 = require("../models/signup-request.model");
const providers_1 = require("../providers");
const successResponse = 'Sucess Response.';
const basePath = '/auth/sign-up';
let SignupRequestController = class SignupRequestController {
    constructor(preSignupFn, userSignupFn) {
        this.preSignupFn = preSignupFn;
        this.userSignupFn = userSignupFn;
    }
    async requestSignup(signUpRequest, handler) {
        var _a;
        // Default expiry is 30 minutes
        const expiryDuration = parseInt((_a = process.env.REQUEST_SIGNUP_LINK_EXPIRY) !== null && _a !== void 0 ? _a : '1800');
        const codePayload = await this.preSignupFn(signUpRequest);
        const token = jwt.sign(codePayload, process.env.JWT_SECRET, {
            expiresIn: expiryDuration,
            subject: signUpRequest.email,
            issuer: process.env.JWT_ISSUER,
            algorithm: 'HS256',
        });
        await handler({
            code: token,
            expiry: expiryDuration,
            email: signUpRequest.email,
        });
    }
    async signupWithToken(req, signupUser) {
        const user = await this.userSignupFn(req, signupUser);
        return new signup_with_token_response_dto_model_1.SignupWithTokenReponseDto({
            email: req.email,
            user: user,
        });
    }
    async verifyInviteToken(signupUser) {
        return signupUser;
    }
};
tslib_1.__decorate([
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)(`${basePath}/create-token`, {
        responses: {
            [204 /* STATUS_CODE.NO_CONTENT */]: {
                description: successResponse,
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__param(1, (0, core_2.inject)(providers_1.SignUpBindings.SIGNUP_HANDLER_PROVIDER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [signup_request_dto_model_1.SignupRequestDto, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupRequestController.prototype, "requestSignup", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, {}, undefined, providers_1.VerifyBindings.BEARER_SIGNUP_VERIFY_PROVIDER),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.post)(`${basePath}/create-user`, {
        security: core_1.OPERATION_SECURITY_SPEC,
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: successResponse,
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: (0, rest_1.getModelSchemaRef)(local_user_profile_1.LocalUserProfileDto),
                    },
                },
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__param(1, (0, core_2.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [local_user_profile_1.LocalUserProfileDto,
        signup_request_model_1.SignupRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupRequestController.prototype, "signupWithToken", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, {}, undefined, providers_1.VerifyBindings.BEARER_SIGNUP_VERIFY_PROVIDER),
    (0, loopback4_authorization_1.authorize)({ permissions: ['*'] }),
    (0, rest_1.get)(`${basePath}/verify-token`, {
        security: core_1.OPERATION_SECURITY_SPEC,
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: successResponse,
            },
            ...core_1.ErrorCodes,
        },
    }),
    tslib_1.__param(0, (0, core_2.inject)(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [signup_request_model_1.SignupRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupRequestController.prototype, "verifyInviteToken", null);
SignupRequestController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_2.inject)(providers_1.SignUpBindings.PRE_LOCAL_SIGNUP_PROVIDER)),
    tslib_1.__param(1, (0, core_2.inject)(providers_1.SignUpBindings.LOCAL_SIGNUP_PROVIDER)),
    tslib_1.__metadata("design:paramtypes", [Function, Function])
], SignupRequestController);
exports.SignupRequestController = SignupRequestController;
//# sourceMappingURL=signup-request.controller.js.map