"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzurePreVerifyProvider = void 0;
class AzurePreVerifyProvider {
    value() {
        return async (
        // sonarignore:start
        accessToken, refreshToken, profile, user) => user;
    }
}
exports.AzurePreVerifyProvider = AzurePreVerifyProvider;
//# sourceMappingURL=azure-pre-verify.provider.js.map