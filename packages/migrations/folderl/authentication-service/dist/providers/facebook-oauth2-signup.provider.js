"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookOauth2SignupProvider = void 0;
const rest_1 = require("@loopback/rest");
class FacebookOauth2SignupProvider {
    value() {
        return async (profile) => {
            throw new rest_1.HttpErrors.NotImplemented(`FacebookOauth2SignupProvider not implemented`);
        };
    }
}
exports.FacebookOauth2SignupProvider = FacebookOauth2SignupProvider;
//# sourceMappingURL=facebook-oauth2-signup.provider.js.map