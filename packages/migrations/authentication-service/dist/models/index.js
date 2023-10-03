"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const auth_client_model_1 = require("./auth-client.model");
const auth_secure_client_model_1 = require("./auth-secure-client.model");
const forget_password_dto_model_1 = require("./forget-password-dto.model");
const forget_password_response_dto_model_1 = require("./forget-password-response-dto.model");
const local_user_profile_1 = require("./local-user-profile");
const login_activity_model_1 = require("./login-activity.model");
const otp_cache_model_1 = require("./otp-cache.model");
const otp_model_1 = require("./otp.model");
const refresh_token_request_model_1 = require("./refresh-token-request.model");
const refresh_token_model_1 = require("./refresh-token.model");
const reset_password_with_client_model_1 = require("./reset-password-with-client.model");
const revoked_token_model_1 = require("./revoked-token.model");
const role_model_1 = require("./role.model");
const signup_request_dto_model_1 = require("./signup-request-dto.model");
const signup_request_response_dto_model_1 = require("./signup-request-response-dto.model");
const signup_request_model_1 = require("./signup-request.model");
const signup_with_token_response_dto_model_1 = require("./signup-with-token-response-dto.model");
const tenant_config_model_1 = require("./tenant-config.model");
const tenant_model_1 = require("./tenant.model");
const user_credentials_model_1 = require("./user-credentials.model");
const user_level_permission_model_1 = require("./user-level-permission.model");
const user_level_resource_model_1 = require("./user-level-resource.model");
const user_tenant_model_1 = require("./user-tenant.model");
const user_model_1 = require("./user.model");
tslib_1.__exportStar(require("./"), exports);
tslib_1.__exportStar(require("./auth-client.model"), exports);
tslib_1.__exportStar(require("./auth-secure-client.model"), exports);
tslib_1.__exportStar(require("./forget-password-dto.model"), exports);
tslib_1.__exportStar(require("./forget-password-response-dto.model"), exports);
tslib_1.__exportStar(require("./local-user-profile"), exports);
tslib_1.__exportStar(require("./otp-cache.model"), exports);
tslib_1.__exportStar(require("./otp.model"), exports);
tslib_1.__exportStar(require("./refresh-token-request.model"), exports);
tslib_1.__exportStar(require("./refresh-token.model"), exports);
tslib_1.__exportStar(require("./reset-password-with-client.model"), exports);
tslib_1.__exportStar(require("./revoked-token.model"), exports);
tslib_1.__exportStar(require("./role.model"), exports);
tslib_1.__exportStar(require("./signup-request-dto.model"), exports);
tslib_1.__exportStar(require("./signup-request-response-dto.model"), exports);
tslib_1.__exportStar(require("./signup-request.model"), exports);
tslib_1.__exportStar(require("./signup-with-token-response-dto.model"), exports);
tslib_1.__exportStar(require("./tenant-config.model"), exports);
tslib_1.__exportStar(require("./tenant.model"), exports);
tslib_1.__exportStar(require("./user-credentials.model"), exports);
tslib_1.__exportStar(require("./user-level-permission.model"), exports);
tslib_1.__exportStar(require("./user-level-resource.model"), exports);
tslib_1.__exportStar(require("./user-tenant.model"), exports);
tslib_1.__exportStar(require("./user.model"), exports);
tslib_1.__exportStar(require("./login-activity.model"), exports);
exports.models = [
    user_model_1.User,
    tenant_model_1.Tenant,
    role_model_1.Role,
    auth_client_model_1.AuthClient,
    auth_secure_client_model_1.AuthSecureClient,
    user_level_permission_model_1.UserLevelPermission,
    user_level_resource_model_1.UserLevelResource,
    refresh_token_model_1.RefreshToken,
    revoked_token_model_1.RevokedToken,
    user_credentials_model_1.UserCredentials,
    otp_model_1.Otp,
    otp_cache_model_1.OtpCache,
    tenant_config_model_1.TenantConfig,
    user_tenant_model_1.UserTenant,
    refresh_token_request_model_1.RefreshTokenRequest,
    forget_password_response_dto_model_1.ForgetPasswordResponseDto,
    forget_password_dto_model_1.ForgetPasswordDto,
    reset_password_with_client_model_1.ResetPasswordWithClient,
    signup_request_dto_model_1.SignupRequestDto,
    signup_request_response_dto_model_1.SignupRequestResponseDto,
    signup_request_model_1.SignupRequest,
    signup_with_token_response_dto_model_1.SignupWithTokenReponseDto,
    local_user_profile_1.LocalUserProfileDto,
    login_activity_model_1.LoginActivity,
];
//# sourceMappingURL=index.js.map