"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalPasswordVerifyProvider = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const node_rsa_1 = tslib_1.__importDefault(require("node-rsa"));
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
                // const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
                //     "MIICXgIBAAKBgQD5ChQUKNk2c7P0qc0mHait5H2rEtWz+030lFnKQJ323M6Rd2il\n" +
                //     "QdVXYB0blJMPfKZtP4oJMxjCdyp8VBxKtH6fraX2nF9OsusIyh25y7RPiFI8tzOG\n" +
                //     "VvMNpU1sPLqCuL7qrg8+v3SIv6+ekbbYy0uP2fG9oh12dXhj5JW8z5BRCwIDAQAB\n" +
                //     "AoGBAIH/Us/bKteTuiJC6MW2wbBUD41XfZo/2keLkPtUk6CjTmj8rfFl1hmQIGGf\n" +
                //     "QszYwn9QpZt7wrbwQYs41LPiWB22iYyenc8Q4bzvU9LBJDl4kBUNbTWsIpf/DEit\n" +
                //     "R/ytkohPxMqKszBtZcTW4cizT4mwH2UJ/n6HZ4X7/F0UqKwxAkEA/WUka4ERpSLZ\n" +
                //     "vxXb+ID5uJzhNMU5gqRyi5NfTcRYCAwZcpVD6qaoP2JV9FNsW/bYEBZxxlc7uS8z\n" +
                //     "GTKD5SPHNQJBAPuZeSeV9AcWAqUS9Ls3kOw1MC98NeuykLtBwLaA4CGJNi2nfYGu\n" +
                //     "1AegYA/vuLmuoOR5RdTkrp73Y5Bq3LcTfz8CQEKNlxQ5USYbUi+TETRiw7QOWEQg\n" +
                //     "7Or4QDGSonxtbmWmr+RdefoejaAgNs02QAajfboz+uwKK2CHGherIeNEE2UCQQDu\n" +
                //     "KLS6eANqwbb3Mx5eKZcRQLe/+z+/QGQoHXGiUBPZKt0SEj2HiEpEfdbwvuaJPXgn\n" +
                //     "TXSAtYdmCp9AkSckVVxZAkEA0T7FQeho6g1mriPtST49CpWaN/ykh7ok2R9SWplA\n" +
                //     "7igRORdo1DqTTW9O7+HW/CmjgviVT+A3AhcribBKfUeYow==\n" +
                //     "-----END RSA PRIVATE KEY-----";
                // const key_private = new node_rsa_1.default(privateKey);
                // const decryptedPassword = key_private.decrypt(password, "utf8");
                // console.log('d',decryptedPassword);
                const user = new auth_user_model_1.AuthUser(await this.userRepository.verifyPassword(username, password));
              
                user.permissions = [];
                return user;
            }
            catch (error) {
                const otp = await this.otpRepository.get(username);
                console.log(otp);
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