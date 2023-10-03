"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupTokenHandlerProvider = void 0;
const rest_1 = require("@loopback/rest");
class SignupTokenHandlerProvider {
    value() {
        return async (dto) => {
            throw new rest_1.HttpErrors.NotImplemented(`SignupTokenHandlerProvider not implemented`);
        };
    }
}
exports.SignupTokenHandlerProvider = SignupTokenHandlerProvider;
//# sourceMappingURL=signup-token-handler.provider.js.map