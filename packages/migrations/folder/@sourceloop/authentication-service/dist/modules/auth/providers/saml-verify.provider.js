"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamlVerifyProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const providers_1 = require("../../../providers");
const repositories_1 = require("../../../repositories");
const rest_1 = require("@loopback/rest");
const auth_user_model_1 = require("../models/auth-user.model");
let SamlVerifyProvider = class SamlVerifyProvider {
    constructor(userRepository, userCredsRepository, signupProvider, preVerifyProvider, postVerifyProvider) {
        this.userRepository = userRepository;
        this.userCredsRepository = userCredsRepository;
        this.signupProvider = signupProvider;
        this.preVerifyProvider = preVerifyProvider;
        this.postVerifyProvider = postVerifyProvider;
    }
    value() {
        return async (profile) => {
            let user = await this.userRepository.findOne({
                where: {
                    email: profile.email,
                },
            });
            user = await this.preVerifyProvider(profile, user);
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
                creds.authProvider !== 'saml' ||
                creds.authId !== profile.id) {
                throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
            }
            const authUser = new auth_user_model_1.AuthUser({
                ...user,
                id: user.id,
            });
            authUser.permissions = [];
            return this.postVerifyProvider(profile, authUser);
        };
    }
};
SamlVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserCredentialsRepository)),
    tslib_1.__param(2, (0, core_1.inject)(providers_1.SignUpBindings.SAML_SIGN_UP_PROVIDER)),
    tslib_1.__param(3, (0, core_1.inject)(providers_1.VerifyBindings.SAML_PRE_VERIFY_PROVIDER)),
    tslib_1.__param(4, (0, core_1.inject)(providers_1.VerifyBindings.SAML_POST_VERIFY_PROVIDER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.UserCredentialsRepository, Function, Function, Function])
], SamlVerifyProvider);
exports.SamlVerifyProvider = SamlVerifyProvider;
//# sourceMappingURL=saml-verify.provider.js.map