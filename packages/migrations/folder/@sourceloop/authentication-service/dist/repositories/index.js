"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositories = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const login_activity_repository_1 = require("./login-activity.repository");
const auth_client_repository_1 = require("./auth-client.repository");
const auth_secure_client_repository_1 = require("./auth-secure-client.repository");
const otp_cache_repository_1 = require("./otp-cache.repository");
const otp_repository_1 = require("./otp.repository");
const refresh_token_repository_1 = require("./refresh-token.repository");
const revoked_token_repository_1 = require("./revoked-token.repository");
const role_repository_1 = require("./role.repository");
const tenant_config_repository_1 = require("./tenant-config.repository");
const tenant_repository_1 = require("./tenant.repository");
const user_credentials_repository_1 = require("./user-credentials.repository");
const user_level_permission_repository_1 = require("./user-level-permission.repository");
const user_level_resource_repository_1 = require("./user-level-resource.repository");
const user_tenant_repository_1 = require("./user-tenant.repository");
const user_repository_1 = require("./user.repository");
tslib_1.__exportStar(require("./auth-client.repository"), exports);
tslib_1.__exportStar(require("./auth-secure-client.repository"), exports);
tslib_1.__exportStar(require("./otp-cache.repository"), exports);
tslib_1.__exportStar(require("./otp.repository"), exports);
tslib_1.__exportStar(require("./refresh-token.repository"), exports);
tslib_1.__exportStar(require("./revoked-token.repository"), exports);
tslib_1.__exportStar(require("./role.repository"), exports);
tslib_1.__exportStar(require("./tenant-config.repository"), exports);
tslib_1.__exportStar(require("./tenant.repository"), exports);
tslib_1.__exportStar(require("./user-credentials.repository"), exports);
tslib_1.__exportStar(require("./user-level-permission.repository"), exports);
tslib_1.__exportStar(require("./user-level-resource.repository"), exports);
tslib_1.__exportStar(require("./user-tenant.repository"), exports);
tslib_1.__exportStar(require("./user.repository"), exports);
tslib_1.__exportStar(require("./login-activity.repository"), exports);
exports.repositories = [
    user_repository_1.UserRepository,
    role_repository_1.RoleRepository,
    user_level_permission_repository_1.UserLevelPermissionRepository,
    refresh_token_repository_1.RefreshTokenRepository,
    revoked_token_repository_1.RevokedTokenRepository,
    auth_client_repository_1.AuthClientRepository,
    auth_secure_client_repository_1.AuthSecureClientRepository,
    user_credentials_repository_1.UserCredentialsRepository,
    otp_repository_1.OtpRepository,
    otp_cache_repository_1.OtpCacheRepository,
    tenant_config_repository_1.TenantConfigRepository,
    user_tenant_repository_1.UserTenantRepository,
    tenant_repository_1.TenantRepository,
    user_level_resource_repository_1.UserLevelResourceRepository,
    login_activity_repository_1.LoginActivityRepository,
];
//# sourceMappingURL=index.js.map