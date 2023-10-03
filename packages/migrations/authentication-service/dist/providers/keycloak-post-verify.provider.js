"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCloakPostVerifyProvider = void 0;
class KeyCloakPostVerifyProvider {
    value() {
        return async (profile, user) => user;
    }
}
exports.KeyCloakPostVerifyProvider = KeyCloakPostVerifyProvider;
//# sourceMappingURL=keycloak-post-verify.provider.js.map