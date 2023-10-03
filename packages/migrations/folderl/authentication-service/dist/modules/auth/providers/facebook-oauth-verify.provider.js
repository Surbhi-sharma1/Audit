"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookOauth2VerifyProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const providers_1 = require("../../../providers");
const repositories_1 = require("../../../repositories");
const auth_user_model_1 = require("../models/auth-user.model");
let FacebookOauth2VerifyProvider = class FacebookOauth2VerifyProvider {
    constructor(userRepository, userCredsRepository, signupProvider, preVerifyProvider, postVerifyProvider) {
        this.userRepository = userRepository;
        this.userCredsRepository = userCredsRepository;
        this.signupProvider = signupProvider;
        this.preVerifyProvider = preVerifyProvider;
        this.postVerifyProvider = postVerifyProvider;
    }
    value() {
        return async (accessToken, refreshToken, profile) => {
            let user = await this.userRepository.findOne({
                where: {
                    email: profile._json.email,
                },
            });
            user = await this.preVerifyProvider(accessToken, refreshToken, profile, user);
            if (!user) {
                const newUser = await this.signupProvider(profile);
                if (newUser) {
                    user = newUser;
                }
                else {
                    throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
                }
            }
            const creds = await this.userCredsRepository.findOne({
                where: {
                    userId: user.id,
                },
            });
            if (!creds ||
                creds.authProvider !== 'facebook' ||
                creds.authId !== profile.id) {
                throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
            }
            const authUser = new auth_user_model_1.AuthUser({
                ...user,
                id: user.id,
            });
            authUser.permissions = [];
            authUser.externalAuthToken = accessToken;
            authUser.externalRefreshToken = refreshToken;
            return this.postVerifyProvider(profile, authUser);
        };
    }
};
FacebookOauth2VerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserCredentialsRepository)),
    tslib_1.__param(2, (0, context_1.inject)(providers_1.SignUpBindings.FACEBOOK_SIGN_UP_PROVIDER)),
    tslib_1.__param(3, (0, context_1.inject)(providers_1.VerifyBindings.FACEBOOK_PRE_VERIFY_PROVIDER)),
    tslib_1.__param(4, (0, context_1.inject)(providers_1.VerifyBindings.FACEBOOK_POST_VERIFY_PROVIDER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.UserCredentialsRepository, Function, Function, Function])
], FacebookOauth2VerifyProvider);
exports.FacebookOauth2VerifyProvider = FacebookOauth2VerifyProvider;
//# sourceMappingURL=facebook-oauth-verify.provider.js.map