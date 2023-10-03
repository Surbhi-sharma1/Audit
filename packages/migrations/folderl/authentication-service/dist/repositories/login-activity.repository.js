"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginActivityRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const types_1 = require("../types");
const models_1 = require("../models");
const core_1 = require("@loopback/core");
let LoginActivityRepository = class LoginActivityRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.LoginActivity, dataSource);
    }
};
LoginActivityRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(`datasources.${types_1.AuthDbSourceName}`)),
    tslib_1.__metadata("design:paramtypes", [repository_1.juggler.DataSource])
], LoginActivityRepository);
exports.LoginActivityRepository = LoginActivityRepository;
//# sourceMappingURL=login-activity.repository.js.map