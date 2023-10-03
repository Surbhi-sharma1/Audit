"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCloakPreVerifyProvider = void 0;
class KeyCloakPreVerifyProvider {
    value() {
        return async (accessToken, refreshToken, profile, user) => user;
    }
}
exports.KeyCloakPreVerifyProvider = KeyCloakPreVerifyProvider;
//# sourceMappingURL=keycloak-pre-verify.provider.js.map