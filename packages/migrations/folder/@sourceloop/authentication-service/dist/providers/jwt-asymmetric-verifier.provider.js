"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAsymmetricVerifierProvider = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs/promises"));
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
class JWTAsymmetricVerifierProvider {
    value() {
        return async (code, options) => {
            var _a;
            const secret = (await fs.readFile((_a = process.env.JWT_PUBLIC_KEY) !== null && _a !== void 0 ? _a : ''));
            const payload = jwt.verify(code, secret, {
                ...options,
                issuer: process.env.JWT_ISSUER,
                algorithms: ['RS256'],
            });
            return payload;
        };
    }
}
exports.JWTAsymmetricVerifierProvider = JWTAsymmetricVerifierProvider;
//# sourceMappingURL=jwt-asymmetric-verifier.provider.js.map