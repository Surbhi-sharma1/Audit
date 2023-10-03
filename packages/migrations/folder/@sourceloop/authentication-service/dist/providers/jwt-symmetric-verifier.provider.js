"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTSymmetricVerifierProvider = void 0;
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
class JWTSymmetricVerifierProvider {
    value() {
        return async (code, options) => {
            const secret = process.env.JWT_SECRET;
            const payload = jwt.verify(code, secret, {
                ...options,
                issuer: process.env.JWT_ISSUER,
                algorithms: ['HS256'],
            });
            return payload;
        };
    }
}
exports.JWTSymmetricVerifierProvider = JWTSymmetricVerifierProvider;
//# sourceMappingURL=jwt-symmetric-verifier.provider.js.map