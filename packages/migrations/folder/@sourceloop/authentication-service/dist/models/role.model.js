"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const core_1 = require("@sourceloop/core");
let Role = class Role extends core_1.UserModifiableEntity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
        name: 'role_type',
        jsonSchema: {
            maximum: 15,
            minimum: 0,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], Role.prototype, "roleType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
Role = tslib_1.__decorate([
    (0, repository_1.model)({
        name: 'roles',
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Role);
exports.Role = Role;
//# sourceMappingURL=role.model.js.map