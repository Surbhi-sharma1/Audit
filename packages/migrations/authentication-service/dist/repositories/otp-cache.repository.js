"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpCacheRepository = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const types_1 = require("../types");
let OtpCacheRepository = class OtpCacheRepository extends repository_1.DefaultKeyValueRepository {
    constructor(dataSource) {
        super(models_1.OtpCache, dataSource);
    }
};
OtpCacheRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(`datasources.${types_1.AuthCacheSourceName}`)),
    tslib_1.__metadata("design:paramtypes", [repository_1.juggler.DataSource])
], OtpCacheRepository);
exports.OtpCacheRepository = OtpCacheRepository;
//# sourceMappingURL=otp-cache.repository.js.map