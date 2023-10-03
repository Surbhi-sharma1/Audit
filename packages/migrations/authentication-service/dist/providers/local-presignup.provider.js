"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalPreSignupProvider = void 0;
class LocalPreSignupProvider {
    value() {
        return async (signupRequest) => {
            return {
                email: signupRequest.email,
            };
        };
    }
}
exports.LocalPreSignupProvider = LocalPreSignupProvider;
//# sourceMappingURL=local-presignup.provider.js.map