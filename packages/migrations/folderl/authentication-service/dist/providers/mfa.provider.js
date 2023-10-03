"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaProvider = void 0;
class MfaProvider {
    constructor() {
        // This is intentional
    }
    value() {
        return async (_user) => false;
    }
}
exports.MfaProvider = MfaProvider;
//# sourceMappingURL=mfa.provider.js.map