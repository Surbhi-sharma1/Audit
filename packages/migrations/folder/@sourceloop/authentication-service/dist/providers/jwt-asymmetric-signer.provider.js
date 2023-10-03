"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAsymmetricSignerProvider = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs/promises"));
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
class JWTAsymmetricSignerProvider {
    value() {
        return async (data, options) => {
            var _a;
            const secret = (await fs.readFile((_a = process.env.JWT_PRIVATE_KEY) !== null && _a !== void 0 ? _a : ''));
            const accessToken = jwt.sign(data, secret, {
                ...options,
                issuer: process.env.JWT_ISSUER,
                algorithm: 'RS256',
            });
            return accessToken;
        };
    }
}
exports.JWTAsymmetricSignerProvider = JWTAsymmetricSignerProvider;
//# sourceMappingURL=jwt-asymmetric-signer.provider.js.map