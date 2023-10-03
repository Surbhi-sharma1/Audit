"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOauth2SignupProvider = void 0;
const rest_1 = require("@loopback/rest");
class GoogleOauth2SignupProvider {
    value() {
        return async (profile) => {
            throw new rest_1.HttpErrors.NotImplemented(`GoogleOauth2SignupProvider not implemented`);
        };
    }
}
exports.GoogleOauth2SignupProvider = GoogleOauth2SignupProvider;
//# sourceMappingURL=google-oauth2-signup.provider.js.map