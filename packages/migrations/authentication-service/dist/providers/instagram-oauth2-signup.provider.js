"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramOauth2SignupProvider = void 0;
const rest_1 = require("@loopback/rest");
class InstagramOauth2SignupProvider {
    value() {
        return async (profile) => {
            throw new rest_1.HttpErrors.NotImplemented(`InstagramOauth2SignupProvider not implemented`);
        };
    }
}
exports.InstagramOauth2SignupProvider = InstagramOauth2SignupProvider;
//# sourceMappingURL=instagram-oauth2-signup.provider.js.map