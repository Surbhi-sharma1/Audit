"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredentialsRepository = void 0;
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
let UserCredentialsRepository = class UserCredentialsRepository extends core_2.DefaultSoftCrudRepository {
    constructor(dataSource, userRepositoryGetter) {
        super(models_1.UserCredentials, dataSource);
        this.userRepositoryGetter = userRepositoryGetter;
        this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
        this.registerInclusionResolver('user', this.user.inclusionResolver);
    }
};
UserCredentialsRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(`datasources.${types_1.AuthDbSourceName}`)),
    tslib_1.__param(1, repository_1.repository.getter('UserRepository')),
    tslib_1.__metadata("design:paramtypes", [repository_1.juggler.DataSource, Function])
], UserCredentialsRepository);
exports.UserCredentialsRepository = UserCredentialsRepository;
//# sourceMappingURL=user-credentials.repository.js.map