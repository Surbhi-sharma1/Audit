"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePreVerifyProvider = void 0;
class GooglePreVerifyProvider {
    value() {
        return async (accessToken, refreshToken, profile, user) => user;
    }
}
exports.GooglePreVerifyProvider = GooglePreVerifyProvider;
//# sourceMappingURL=google-pre-verify.provider.js.map