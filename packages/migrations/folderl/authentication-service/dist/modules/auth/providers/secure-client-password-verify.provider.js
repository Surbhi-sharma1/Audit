"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureClientPasswordVerifyProvider = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../../../repositories");
let SecureClientPasswordVerifyProvider = class SecureClientPasswordVerifyProvider {
    constructor(authSecureClientRepository) {
        this.authSecureClientRepository = authSecureClientRepository;
    }
    value() {
        return async (clientId, clientSecret) => {
            return this.authSecureClientRepository.findOne({
                where: {
                    clientId,
                },
            });
        };
    }
};
SecureClientPasswordVerifyProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.AuthSecureClientRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.AuthSecureClientRepository])
], SecureClientPasswordVerifyProvider);
exports.SecureClientPasswordVerifyProvider = SecureClientPasswordVerifyProvider;
//# sourceMappingURL=secure-client-password-verify.provider.js.map