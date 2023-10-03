"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
const tenant_model_1 = require("./tenant.model");
const user_credentials_model_1 = require("./user-credentials.model");
const user_tenant_model_1 = require("./user-tenant.model");
let User = class User extends core_1.UserModifiableEntity {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        name: 'first_name',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'last_name',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'middle_name',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "middleName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        jsonSchema: {
            pattern: `^\\+?[1-9]\\d{1,14}$`,
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'auth_client_ids',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "authClientIds", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        name: 'last_login',
        postgresql: {
            column: 'last_login',
        },
    }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "dob", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        description: `This field takes a single character as input in database.
    'M' for male and 'F' for female.`,
        jsonSchema: {
            enum: ['M', 'F', 'O'],
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => user_credentials_model_1.UserCredentials, { keyTo: 'userId' }),
    tslib_1.__metadata("design:type", user_credentials_model_1.UserCredentials)
], User.prototype, "credentials", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => tenant_model_1.Tenant, { keyFrom: 'default_tenant_id', name: 'defaultTenant' }, {
        name: 'default_tenant_id',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "defaultTenantId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => user_tenant_model_1.UserTenant, { keyTo: 'userId' }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "userTenants", void 0);
User = tslib_1.__decorate([
    (0, repository_1.model)({
        name: 'users',
        description: 'This is signature for user model.',
    })
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map