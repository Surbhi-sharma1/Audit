"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamlSignupProvider = void 0;
const rest_1 = require("@loopback/rest");
class SamlSignupProvider {
    value() {
        // sonarignore:start
        return async (profile) => {
            // sonarignore:end
            throw new rest_1.HttpErrors.NotImplemented(`SamlSignupProvider not implemented`);
        };
    }
}
exports.SamlSignupProvider = SamlSignupProvider;
//# sourceMappingURL=saml-signup.provider.js.map