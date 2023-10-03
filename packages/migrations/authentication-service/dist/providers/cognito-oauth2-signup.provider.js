"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoOauth2SignupProvider = void 0;
const rest_1 = require("@loopback/rest");
class CognitoOauth2SignupProvider {
    value() {
        return async (profile) => {
            throw new rest_1.HttpErrors.NotImplemented(`CognitoOauth2SignupProvider not implemented`);
        };
    }
}
exports.CognitoOauth2SignupProvider = CognitoOauth2SignupProvider;
//# sourceMappingURL=cognito-oauth2-signup.provider.js.map