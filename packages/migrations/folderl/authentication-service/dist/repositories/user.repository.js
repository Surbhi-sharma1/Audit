"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_2 = require("@sourceloop/core");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const loopback4_authentication_1 = require("loopback4-authentication");
const models_1 = require("../models");
const types_1 = require("../types");
const otp_repository_1 = require("./otp.repository");
const user_credentials_repository_1 = require("./user-credentials.repository");
const node_rsa_1 = tslib_1.__importDefault(require("node-rsa"));
const saltRounds = 10;
let UserRepository = class UserRepository extends core_2.DefaultUserModifyCrudRepository {
    constructor(dataSource, getUserCredsRepository, getOtpRepository, getCurrentUser, tenantRepositoryGetter, userTenantRepositoryGetter, logger) {
        super(models_1.User, dataSource, getCurrentUser);
        this.getOtpRepository = getOtpRepository;
        this.getCurrentUser = getCurrentUser;
        this.tenantRepositoryGetter = tenantRepositoryGetter;
        this.userTenantRepositoryGetter = userTenantRepositoryGetter;
        this.logger = logger;
        this.userTenants = this.createHasManyRepositoryFactoryFor('userTenants', userTenantRepositoryGetter);
        this.registerInclusionResolver('userTenants', this.userTenants.inclusionResolver);
        this.tenant = this.createBelongsToAccessorFor('defaultTenant', tenantRepositoryGetter);
        this.registerInclusionResolver('defaultTenant', this.tenant.inclusionResolver);
        this.credentials = this.createHasOneRepositoryFactoryFor('credentials', getUserCredsRepository);
        this.registerInclusionResolver('credentials', this.credentials.inclusionResolver);
    }
    async create(entity, options) {
        const user = await super.create(entity, options);
        try {
            // Add temporary password for first time
            const password = (await bcrypt.hash(process.env.USER_TEMP_PASSWORD, saltRounds));
            const creds = new models_1.UserCredentials({
                authProvider: 'internal',
                password,
            });
            await this.credentials(user.id).create(creds);
        }
        catch (err) {
            throw new rest_1.HttpErrors.UnprocessableEntity('Error while hashing password');
        }
        return user;
    }
    async createWithoutPassword(entity, options) {
        return super.create(entity, options);
    }
    async verifyPassword(username, password) {
           const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
           "MIIEpAIBAAKCAQEAhZdivG9heeJB9VQy0jkNvE/Ku42RuwduYeruRvO7XExXJp7s\n" +
           "MdpYwbTacz/CeJQAnx9JlzZMnMeKVpqQSpKWQc7f5lsrGx6mdsj8Uald7kg0PwDl\n" +
           "IPIJ04okvoukxGkO4pPDVcGX07m2bCpp31b/ZDJvEWw8++1mwP9tU00qeRbqYoAp\n" +
           "WsCgO4oMLszH6n7XOGSqeXOjvYHBmA4+5JKfmSDHYY/Wwkx3Ly4+Vqbupedju9Qt\n" +
           "2bPYEzam94hYLkjohvjf+g8wRGWKHIqLZURR4SPClEVp+6bIebk/m7X7zBlJhGO2\n" +
           "vNIJ9RmWe7Y41+7fF4BaUnkTC57NIkrqJwmpvQIDAQABAoIBAHm61oeqXoI3v66T\n" +
           "CLQytOdxNeTtPWvVe6nR70nL8mBKV+ejTMqokdQAvkXiRYymIGLemaomGm2KDe6Y\n" +
           "bP7mz/ArWC6JyJ+vsDPxNKoc0LC+Lo1yfVcl9fpCmPTgPkWTDbM8vfO4smaFhUrO\n" +
           "4yZWGeXtZvPTU0akrssSdUZAvIEVIl/WPiV3yhIK9vSvWlPhIDlIF7mZ+KV/ctZr\n" +
           "bu+z9HMQtQka+tVkN7/cdK2n5vbd9NQGhHLvcce6wISAl3z2CNxIoQWv1gEZKGj1\n" +
           "mte9VH2MNqDuBxe62/nCKD/J7A8RUMmQNXLmXqMDC2iJDw9VZjRk3gxzb37ooUMq\n" +
           "waxKaYECgYEA09BC6zVEt0rSLqvwLiTNn4czR5G2XxAsM5NhPMuZqiOI+esyeOHC\n" +
           "QrbfGKztkrLpkUeuaERE4CowRoM2o5xfcMS5v8sCBRtcJRGSzv/7p20ZYwjc6Cq3\n" +
           "clGcjqww7RFIcKiU7VUcP/d97LZ6Ed/qk9wbGAKZUw9P4UZkInpbws0CgYEAoXW6\n" +
           "sTJ7XyvfMDAtIxLZQ7geeiiBfeq6w9gVTPL0BQ8ZTow4BS5rD4aeIAVkDIUQpq1E\n" +
           "kyfueOvTgiSzHnTKFs6LGYDq11LG1vf+hL0K861Im8LGH1lb1BnEkBK464oRnxpW\n" +
           "7E25ZofXkLhYyAOhz4HBNZVFbMKHsfZO5QAb4rECgYEAmaNZtuRnmJA0Dth2mfHm\n" +
           "GI3n+0TNRP0lIrAHeyKvroKiC623aYlP8DZXcr2UgbE2zENzVXwXfYX8iFkK2/hE\n" +
           "HjcECQNGzs9+sgCiPXXeYx42qOg33EuHzus1pSNvRbYgll8hz1jJ6fgqJfZiau7B\n" +
           "Z0jjejIAZwgXR+9YGM4qGw0CgYB4FJvtj3Lr3DAYoavgKvOFBtk71wY/hKS0ZO+q\n" +
           "lAJiBNG4dlZvnA8ps9/ERt4a5Zf1rmWS4B7etd1PLEY+/3MRNTmElTmTPM//Lt+P\n" +
           "Dx2nDxgyJ9C7nfTKsQNcd2AqZTwnzSoags/BboQm8MOutezQ7FqqpELG2YKcG2if\n" +
           "rc4PcQKBgQCS9T/MmCI5FJtI51OldzJrf8AP0OpRobTxHlpw1Xiax9AtiUGd1Usn\n" +
           "uQ57xod2lBjZVjibpDP9KdnFGKWDdp/o5817NG4xVQ9phBHFLaAzrSCDXHh+4xxb\n" +
           "N51uvBy9nUxGNkV8Ys1ZAdyTAuSiOaaaYUxqqcimTVhQ7i32JLLnuQ==\n" +
           "-----END RSA PRIVATE KEY-----\n"
                const key_private = new node_rsa_1.default(privateKey);
                const decryptedPassword = key_private.decrypt(password, "utf8");
                console.log('d',decryptedPassword);
                console.log(username)
        const user = await super.findOne({
            where: { username: username.toLowerCase() },
        });
        const creds = user && (await this.credentials(user.id).get());
        if (!user || user.deleted) {
            throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
        }
        else if (!(creds === null || creds === void 0 ? void 0 : creds.password) ||
            creds.authProvider !== core_2.AuthProvider.INTERNAL ||
            !(await bcrypt.compare(decryptedPassword, creds.password))) {
            this.logger.error('User creds not found in DB or is invalid');
            throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        else {
            return user;
        }
    }
    async updatePassword(username, password, newPassword) {
        const user = await super.findOne({ where: { username } });
        const creds = user && (await this.credentials(user.id).get());
        if (!user || user.deleted || !creds || !creds.password) {
            throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
        }
        else if (creds.authProvider !== core_2.AuthProvider.INTERNAL) {
            throw new rest_1.HttpErrors.BadRequest("PasswordCannotBeChangedForExternalUser" /* AuthenticateErrorKeys.PasswordCannotBeChanged */);
        }
        else if (!(await bcrypt.compare(password, creds.password))) {
            throw new rest_1.HttpErrors.Unauthorized("Incorrect Password" /* AuthErrorKeys.WrongPassword */);
        }
        else if (await bcrypt.compare(newPassword, creds.password)) {
            throw new rest_1.HttpErrors.Unauthorized('Password cannot be same as previous password!');
        }
        else {
            // Do nothing
        }
        await this.credentials(user.id).patch({
            password: await bcrypt.hash(newPassword, saltRounds),
        });
        return user;
    }
    async changePassword(username, newPassword, oldPassword) {
        const user = await super.findOne({ where: { username } });
        const creds = user && (await this.credentials(user.id).get());
        // decryprt oldPassword
        // decrypt newPassword
        //  env private
        if (oldPassword) {
            // This method considers old password as OTP
            const otp = await (await this.getOtpRepository()).get(username);
            if (!otp || otp.otp !== oldPassword) {
                throw new rest_1.HttpErrors.Unauthorized("Incorrect Password" /* AuthErrorKeys.WrongPassword */);
            }
        }
        if ((creds === null || creds === void 0 ? void 0 : creds.authProvider) !== core_2.AuthProvider.INTERNAL) {
            throw new rest_1.HttpErrors.Unauthorized("PasswordCannotBeChangedForExternalUser" /* AuthenticateErrorKeys.PasswordCannotBeChanged */);
        }
        if (!user || user.deleted || !creds || !creds.password) {
            throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
            // decryprt 
        }
        else if (await bcrypt.compare(newPassword, creds.password)) {
            throw new rest_1.HttpErrors.Unauthorized('Password cannot be same as previous password!');
        }
        else {
            // DO nothing
        }
        await this.credentials(user.id).patch({
            password: await bcrypt.hash(newPassword, saltRounds),
        });
        return user;
    }
    async updateLastLogin(userId) {
        await super.updateById(userId, {
            lastLogin: Date.now(),
        }, {
            currentUser: { id: userId },
        });
    }
    async firstTimeUser(userId) {
        const user = await super.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new rest_1.HttpErrors.NotFound("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
        }
        const userTenant = await (await this.userTenantRepositoryGetter()).findOne({
            where: {
                userId,
                tenantId: user.defaultTenantId,
                status: {
                    inq: [0 /* UserStatus.REGISTERED */, 3 /* UserStatus.PASSWORD_CHANGE_NEEDED */],
                },
            },
        });
        return !!userTenant;
    }
};
UserRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(`datasources.${types_1.AuthDbSourceName}`)),
    tslib_1.__param(1, repository_1.repository.getter(user_credentials_repository_1.UserCredentialsRepository)),
    tslib_1.__param(2, repository_1.repository.getter(otp_repository_1.OtpRepository)),
    tslib_1.__param(3, core_1.inject.getter(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__param(4, repository_1.repository.getter('TenantRepository')),
    tslib_1.__param(5, repository_1.repository.getter('UserTenantRepository')),
    tslib_1.__param(6, (0, core_1.inject)(core_2.LOGGER.LOGGER_INJECT)),
    tslib_1.__metadata("design:paramtypes", [repository_1.juggler.DataSource, Function, Function, Function, Function, Function, Object])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map