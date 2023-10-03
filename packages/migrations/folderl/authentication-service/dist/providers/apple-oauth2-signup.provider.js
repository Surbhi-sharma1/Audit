"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleOauth2SignupProvider = void 0;
const rest_1 = require("@loopback/rest");
class AppleOauth2SignupProvider {
    value() {
        return async (profile) => {
            throw new rest_1.HttpErrors.NotImplemented(`AppleOauth2SignupProvider not implemented`);
        };
    }
}
exports.AppleOauth2SignupProvider = AppleOauth2SignupProvider;
//# sourceMappingURL=apple-oauth2-signup.provider.js.map