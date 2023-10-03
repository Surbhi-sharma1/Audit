"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordProvider = void 0;
const rest_1 = require("@loopback/rest");
class ForgotPasswordProvider {
    value() {
        return async (dto) => {
            throw new rest_1.HttpErrors.NotImplemented(`ForgotPasswordProvider not implemented`);
        };
    }
}
exports.ForgotPasswordProvider = ForgotPasswordProvider;
//# sourceMappingURL=forgot-password.provider.js.map