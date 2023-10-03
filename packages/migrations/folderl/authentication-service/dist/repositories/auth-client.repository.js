"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClientRepository = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const core_2 = require("@sourceloop/core");
const models_1 = require("../models");
const types_1 = require("../types");
let AuthClientRepository = class AuthClientRepository extends core_2.DefaultSoftCrudRepository {
    constructor(dataSource) {
        super(models_1.AuthClient, dataSource);
    }
};
AuthClientRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(`datasources.${types_1.AuthDbSourceName}`)),
    tslib_1.__metadata("design:paramtypes", [repository_1.juggler.DataSource])
], AuthClientRepository);
exports.AuthClientRepository = AuthClientRepository;
//# sourceMappingURL=auth-client.repository.js.map