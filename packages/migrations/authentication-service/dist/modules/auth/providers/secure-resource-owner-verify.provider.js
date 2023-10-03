"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureResourceOwnerVerifyProvider = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const loopback4_authentication_1 = require("loopback4-authentication");
const repositories_1 = require("../../../repositories");
let SecureResourceOwnerVerifyProvider = class SecureResourceOwnerVerifyProvider {
    constructor(userRepository, utRepository, authSecureClientRepository, otpRepository) {
        this.userRepository = userRepository;
        this.utRepository = utRepository;
        this.authSecureClientRepository = authSecureClientRepository;
        this.otpRepository = otpRepository;
    }
    value() {
        return async (clientId, clientSecret, username, password) => {
            let user;
            try {
                user = await this.userRepository.verifyPassword(username, password);
            }
            catch (error) {
                const otp = await this.otpRepository.get(username);
                if (!otp || otp.otp !== password) {
                    throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
                }
                user = await this.userRepository.findOne({
                    where: { username },
                });
                if (!user) {
                    throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
                }
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
            const client = await this.authSecureClientRepository.findOne({
                where: {
                    clientId,
                },
            });
            if (!client ||
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                user.authClientIds.indexOf(client.id || 0) < 0) {
                throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
            }
            else if (client.clientType !== loopback4_authentication_1.ClientType.public &&
                (!client.clientSecret || client.clientSecret !== clientSecret)) {
                throw new rest_1.HttpErrors.Unauthorized("Client Verification Failed" /* AuthErrorKeys.ClientVerificationFailed */);
            }
            else {
                // Do nothing
            }
            return {
                client,
                user,
            };
        };
    }
};
SecureResourceOwnerVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserTenantRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.AuthSecureClientRepository)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.OtpRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.UserTenantRepository,
        repositories_1.AuthSecureClientRepository,
        repositories_1.OtpRepository])
], SecureResourceOwnerVerifyProvider);
exports.SecureResourceOwnerVerifyProvider = SecureResourceOwnerVerifyProvider;
//# sourceMappingURL=secure-resource-owner-verify.provider.js.map