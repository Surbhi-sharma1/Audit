"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCloakSignupProvider = void 0;
const rest_1 = require("@loopback/rest");
class KeyCloakSignupProvider {
    value() {
        return async (profile) => {
            throw new rest_1.HttpErrors.NotImplemented(`KeyCloakSignupProvider not implemented`);
        };
    }
}
exports.KeyCloakSignupProvider = KeyCloakSignupProvider;
//# sourceMappingURL=keycloak-signup.provider.js.map