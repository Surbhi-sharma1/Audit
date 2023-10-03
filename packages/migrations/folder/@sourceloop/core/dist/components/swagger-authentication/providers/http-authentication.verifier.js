"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpAuthenticationVerifierProvider = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const keys_1 = require("../../../keys");
let HttpAuthenticationVerifierProvider = class HttpAuthenticationVerifierProvider {
    constructor(coreConfig) {
        this.coreConfig = coreConfig;
    }
    value() {
        return (username, password) => {
            return (username === this.coreConfig.swaggerUsername &&
                password === this.coreConfig.swaggerPassword);
        };
    }
};
HttpAuthenticationVerifierProvider = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(keys_1.SFCoreBindings.config, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], HttpAuthenticationVerifierProvider);
exports.HttpAuthenticationVerifierProvider = HttpAuthenticationVerifierProvider;
//# sourceMappingURL=http-authentication.verifier.js.map