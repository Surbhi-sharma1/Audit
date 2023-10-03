"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplePreVerifyProvider = void 0;
class ApplePreVerifyProvider {
    value() {
        return async (accessToken, refreshToken, profile, user) => user;
    }
}
exports.ApplePreVerifyProvider = ApplePreVerifyProvider;
//# sourceMappingURL=apple-pre-verify.provider.js.map