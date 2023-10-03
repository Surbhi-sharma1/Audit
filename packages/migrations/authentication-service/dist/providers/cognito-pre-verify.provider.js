"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoPreVerifyProvider = void 0;
class CognitoPreVerifyProvider {
    value() {
        return async (accessToken, refreshToken, profile, user) => user;
    }
}
exports.CognitoPreVerifyProvider = CognitoPreVerifyProvider;
//# sourceMappingURL=cognito-pre-verify.provider.js.map