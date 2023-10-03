"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHelperService = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_2 = require("@sourceloop/core");
const repositories_1 = require("../repositories");
let LoginHelperService = class LoginHelperService {
    constructor(userTenantRepo, logger) {
        this.userTenantRepo = userTenantRepo;
        this.logger = logger;
    }
    async verifyClientUserLogin(req, client, reqUser) {
        var _a;
        const currentUser = reqUser;
        if (!client) {
            this.logger.error('Auth client not found or invalid');
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
        }
        if (!currentUser) {
            this.logger.error('Auth user not found or invalid');
            throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        const userStatus = await this.userTenantRepo.findOne({
            where: {
                userId: currentUser.id,
            },
            fields: {
                status: true,
            },
        });
        if (!currentUser.authClientIds || currentUser.authClientIds.length === 0) {
            this.logger.error('No allowed auth clients found for this user in DB');
            throw new rest_1.HttpErrors.UnprocessableEntity("Client User Missing" /* AuthErrorKeys.ClientUserMissing */);
            // sonarignore:start
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (currentUser.authClientIds.indexOf((_a = client.id) !== null && _a !== void 0 ? _a : 0) < 0) {
            // sonarignore:end
            this.logger.error('User is not allowed to access client id passed in request');
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
        }
        else if ((userStatus === null || userStatus === void 0 ? void 0 : userStatus.status) === 0 /* UserStatus.REGISTERED */) {
            this.logger.error('User is in registered state');
            throw new rest_1.HttpErrors.BadRequest('User not active yet');
        }
        else {
            // Do nothing and move ahead
        }
        return userStatus;
    }
};
LoginHelperService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserTenantRepository)),
    tslib_1.__param(1, (0, context_1.inject)(core_2.LOGGER.LOGGER_INJECT)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserTenantRepository, Object])
], LoginHelperService);
exports.LoginHelperService = LoginHelperService;
//# sourceMappingURL=login-helper.service.js.map