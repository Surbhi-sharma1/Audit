"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureAdSignupProvider = void 0;
const rest_1 = require("@loopback/rest");
class AzureAdSignupProvider {
    value() {
        // sonarignore:start
        return async (profile) => {
            // sonarignore:end
            throw new rest_1.HttpErrors.NotImplemented(`AzureAdSignupProvider not implemented`);
        };
    }
}
exports.AzureAdSignupProvider = AzureAdSignupProvider;
//# sourceMappingURL=azure-ad-signup.provider.js.map