"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalPasswordVerifyProvider = void 0;
const tslib_1 = require("tslib");
const forge = require("node-forge");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../../../repositories");
const auth_user_model_1 = require("../models/auth-user.model");
let LocalPasswordVerifyProvider = class LocalPasswordVerifyProvider {
    constructor(userRepository, utRepository, otpRepository) {
        this.userRepository = userRepository;
        this.utRepository = utRepository;
        this.otpRepository = otpRepository;
    }
    value() {
        return async (username, password) => {
            try {
                const user = new auth_user_model_1.AuthUser(await this.userRepository.verifyPassword(username, password));
                user.permissions = [];
                return user;
            }
            catch (error) {
                const otp = await this.otpRepository.get(username);
                if (!otp || otp.otp !== password) {
                    throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
                }
                const user = await this.userRepository.findOne({
                    where: { username },
                });
                if (!user) {
                    throw new rest_1.HttpErrors.Unauthorized("Client User Missing" /* AuthErrorKeys.ClientUserMissing */);
                }
                const userTenant = await this.utRepository.findOne({
                    where: {
                        userId: user.id,
                        tenantId: user.defaultTenantId,
                        status: {
                            nin: [4 /* UserStatus.REJECTED */, 2 /* UserStatus.INACTIVE */],
                        },
                    },
                });
                if (!userTenant) {
                    throw new rest_1.HttpErrors.Unauthorized("UserInactive" /* AuthenticateErrorKeys.UserInactive */);
                }
                const retUser = new auth_user_model_1.AuthUser(user);
                retUser.permissions = [];
                return retUser;
            }
        };
    }
};
LocalPasswordVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserTenantRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.OtpRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.UserTenantRepository,
        repositories_1.OtpRepository])
], LocalPasswordVerifyProvider);
exports.LocalPasswordVerifyProvider = LocalPasswordVerifyProvider;
//# sourceMappingURL=local-password-verify.provider.js.map