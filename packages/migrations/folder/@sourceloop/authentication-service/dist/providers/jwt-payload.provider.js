"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtPayloadProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_2 = require("@sourceloop/core");
const loopback4_authorization_1 = require("loopback4-authorization");
const auth_1 = require("../modules/auth");
const repositories_1 = require("../repositories");
let JwtPayloadProvider = class JwtPayloadProvider {
    constructor(roleRepo, utPermsRepo, userTenantRepo, tenantConfigRepo, getUserPermissions, logger) {
        this.roleRepo = roleRepo;
        this.utPermsRepo = utPermsRepo;
        this.userTenantRepo = userTenantRepo;
        this.tenantConfigRepo = tenantConfigRepo;
        this.getUserPermissions = getUserPermissions;
        this.logger = logger;
    }
    value() {
        return async (authUserData, authClient, tenantId) => {
            const user = authUserData;
            const userTenant = await this.userTenantRepo.findOne({
                where: {
                    userId: user.id,
                    tenantId: tenantId !== null && tenantId !== void 0 ? tenantId : user.defaultTenantId,
                },
            });
            if (!userTenant) {
                throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* AuthenticateErrorKeys.UserDoesNotExist */);
            }
            if (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            user.authClientIds.indexOf(authClient.id || 0) < 0) {
                throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* AuthErrorKeys.ClientInvalid */);
            }
            delete user.authClientIds;
            // Create user DTO for payload to JWT
            const authUser = new auth_1.AuthUser(Object.assign({}, user));
            this._removeUnnecessaryData(authUser);
            // Add locale info
            await this._setLocale(authUser, userTenant);
            authUser.tenantId = userTenant.tenantId;
            authUser.userTenantId = userTenant.id;
            authUser.status = userTenant.status;
            const role = await this.roleRepo.findById(userTenant.roleId);
            if (!role) {
                this.logger.error('Role not found for the user');
                throw new rest_1.HttpErrors.UnprocessableEntity("UnprocessableData" /* AuthenticateErrorKeys.UnprocessableData */);
            }
            const utPerms = await this.utPermsRepo.find({
                where: {
                    userTenantId: userTenant.id,
                },
                fields: {
                    permission: true,
                    allowed: true,
                },
            });
            authUser.permissions = this.getUserPermissions(utPerms, role.permissions);
            authUser.role = role.name;
            if (authUser.dob) {
                const age = (0, core_2.getAge)(new Date(authUser.dob));
                authUser.age = age;
            }
            return authUser.toJSON();
        };
    }
    _removeUnnecessaryData(authUser) {
        delete authUser.externalAuthToken;
        delete authUser.externalRefreshToken;
        delete authUser.createdBy;
        delete authUser.createdOn;
        delete authUser.deleted;
        delete authUser.deletedBy;
        delete authUser.deletedOn;
        delete authUser.modifiedBy;
        delete authUser.modifiedOn;
        return authUser;
    }
    async _setLocale(authUser, userTenant) {
        var _a;
        if (userTenant.locale && userTenant.locale.length > 0) {
            // Use locale from user preferences first
            authUser.userPreferences = { locale: userTenant.locale };
        }
        else {
            // Use tenant config locale at second priority
            const config = await this.tenantConfigRepo.findOne({
                where: {
                    configKey: "profile" /* ConfigKey.Profile */,
                },
            });
            // Use locale from environment as fallback overall
            let locale = (_a = process.env.LOCALE) !== null && _a !== void 0 ? _a : 'en';
            if (config === null || config === void 0 ? void 0 : config.configValue) {
                // sonarignore:start
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                locale = config.configValue.locale;
                // sonarignore:end
            }
            authUser.userPreferences = {
                locale,
            };
        }
    }
};
JwtPayloadProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.RoleRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserLevelPermissionRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.UserTenantRepository)),
    tslib_1.__param(3, (0, repository_1.repository)(repositories_1.TenantConfigRepository)),
    tslib_1.__param(4, (0, core_1.inject)(loopback4_authorization_1.AuthorizationBindings.USER_PERMISSIONS)),
    tslib_1.__param(5, (0, core_1.inject)(core_2.LOGGER.LOGGER_INJECT)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RoleRepository,
        repositories_1.UserLevelPermissionRepository,
        repositories_1.UserTenantRepository,
        repositories_1.TenantConfigRepository, Function, Object])
], JwtPayloadProvider);
exports.JwtPayloadProvider = JwtPayloadProvider;
//# sourceMappingURL=jwt-payload.provider.js.map