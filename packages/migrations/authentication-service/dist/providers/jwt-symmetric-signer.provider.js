"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTSymmetricSignerProvider = void 0;
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
class JWTSymmetricSignerProvider {
    value() {
        return async (data, options) => {
            const secret = process.env.JWT_SECRET;
            const accessToken = jwt.sign(data, secret, {
                ...options,
                issuer: process.env.JWT_ISSUER,
                algorithm: 'HS256',
            });
            return accessToken;
        };
    }
}
exports.JWTSymmetricSignerProvider = JWTSymmetricSignerProvider;
//# sourceMappingURL=jwt-symmetric-signer.provider.js.map