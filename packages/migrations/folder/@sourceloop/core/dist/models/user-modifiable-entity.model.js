"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModifiableEntity = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
const base_entity_model_1 = require("./base-entity.model");
class UserModifiableEntity extends base_entity_model_1.BaseEntity {
}
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'created_by',
    }),
    tslib_1.__metadata("design:type", String)
], UserModifiableEntity.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'modified_by',
    }),
    tslib_1.__metadata("design:type", String)
], UserModifiableEntity.prototype, "modifiedBy", void 0);
exports.UserModifiableEntity = UserModifiableEntity;
//# sourceMappingURL=user-modifiable-entity.model.js.map