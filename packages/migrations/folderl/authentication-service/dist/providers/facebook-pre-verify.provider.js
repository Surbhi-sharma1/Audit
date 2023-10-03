"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookPreVerifyProvider = void 0;
class FacebookPreVerifyProvider {
    value() {
        return async (accessToken, refreshToken, profile, user) => user;
    }
}
exports.FacebookPreVerifyProvider = FacebookPreVerifyProvider;
//# sourceMappingURL=facebook-pre-verify.provider.js.map