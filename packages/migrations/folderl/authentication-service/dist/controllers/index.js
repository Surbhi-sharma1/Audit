"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const apple_login_controller_1 = require("../modules/auth/apple-login.controller");
const facebook_login_controller_1 = require("../modules/auth/facebook-login.controller");
const google_login_controller_1 = require("../modules/auth/google-login.controller");
const instagram_login_controller_1 = require("../modules/auth/instagram-login.controller");
const keycloak_login_controller_1 = require("../modules/auth/keycloak-login.controller");
const login_controller_1 = require("../modules/auth/login.controller");
const logout_controller_1 = require("../modules/auth/logout.controller");
const forget_password_controller_1 = require("./forget-password.controller");
const otp_controller_1 = require("../modules/auth/otp.controller");
const signup_request_controller_1 = require("./signup-request.controller");
const azure_login_controller_1 = require("../modules/auth/azure-login.controller");
const cognito_login_controller_1 = require("../modules/auth/cognito-login.controller");
const saml_login_controller_1 = require("../modules/auth/saml-login.controller");
const login_activity_controller_1 = require("./login-activity.controller");
tslib_1.__exportStar(require("../modules/auth/login.controller"), exports);
tslib_1.__exportStar(require("../modules/auth/logout.controller"), exports);
tslib_1.__exportStar(require("../modules/auth/otp.controller"), exports);
tslib_1.__exportStar(require("./forget-password.controller"), exports);
tslib_1.__exportStar(require("./signup-request.controller"), exports);
tslib_1.__exportStar(require("./login-activity.controller"), exports);
exports.controllers = [
    login_controller_1.LoginController,
    google_login_controller_1.GoogleLoginController,
    facebook_login_controller_1.FacebookLoginController,
    apple_login_controller_1.AppleLoginController,
    keycloak_login_controller_1.KeycloakLoginController,
    instagram_login_controller_1.InstagramLoginController,
    logout_controller_1.LogoutController,
    otp_controller_1.OtpController,
    forget_password_controller_1.ForgetPasswordController,
    signup_request_controller_1.SignupRequestController,
    azure_login_controller_1.AzureLoginController,
    cognito_login_controller_1.CognitoLoginController,
    saml_login_controller_1.SamlLoginController,
    login_activity_controller_1.LoginActivityController,
];
//# sourceMappingURL=index.js.map